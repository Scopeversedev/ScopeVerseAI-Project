import pandas as pd
import numpy as np
import ta
from flask import request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()

secret_key = os.getenv('OPENAI')
client = OpenAI(api_key = secret_key)
def calculate_rating(data, custom_weights=None, market_conditions=None):
    # Define default weights
    default_weights = {
        "Market Cap": 0.25,        
        "Volume": 0.20,           
        "Price Change": 0.15,     
        "Liquidity": 0.15,        
        "Holder Distribution": 0.10,  
        "Smart Money Activity": 0.10, 
        "Sentiment Analysis": 0.05,
    }
    
    # Allow custom weights to override default weights
    weights = custom_weights or default_weights

    # Initialize ratings list with descriptions, scores, and weights
    ratings = []

    # 1. Market Cap (Dynamic threshold, fine-grained)
    market_cap_score = np.clip((data["market_cap"] / 1_000_000) * 10, 1, 10)
    ratings.append(("Market Cap", market_cap_score))

    # 2. Volume (Dynamic and contextual)
    volume_score = np.clip((data["volume"] / 1_000_000) * 10, 1, 10)
    ratings.append(("Volume", volume_score))

    # 3. Price Change (Fine-grained trend analysis)
    last_24h_change = data["price_change"]["last_24h"]
    # Compare with long-term price trend (assumed market_conditions is a dictionary passed)
    trend_factor = 1  # Default factor for no trend analysis
    if market_conditions and 'price_trend' in market_conditions:
        trend_factor = market_conditions['price_trend']  # Dynamic trend weight
    price_change_score = np.clip((last_24h_change + 100) / 20 * trend_factor, 1, 10)
    ratings.append(("Price Change", price_change_score))

    # 4. Liquidity (Secure if 'burnt')
    liquidity_score = 10 if data["liquidity"]["lp_status"] == "burnt" else 6
    ratings.append(("Liquidity", liquidity_score))

    # 5. Holder Distribution (Fine-grained scoring)
    top_10_holders = data["holder_distribution"]["top_10_holders_percent"]
    holder_distribution_score = np.clip((1 - top_10_holders) * 10, 1, 10)
    ratings.append(("Holder Distribution", holder_distribution_score))

    # 6. Smart Money Activity (Fine-grained dynamic scoring)
    smart_transactions = data["smart_money_activity"]["significant_transactions"]
    smart_money_score = np.clip(smart_transactions / 10 * 10, 1, 10)
    ratings.append(("Smart Money Activity", smart_money_score))

    # 7. Sentiment Analysis (Fine-tuned from multiple sources)
    sentiment_score = data["sentiment_analysis"]["positive_sentiment_score"] * 10
    # Here, consider the possibility of combining sentiments from multiple sources or adding a resilience factor
    ratings.append(("Sentiment Analysis", np.clip(sentiment_score, 1, 10)))

    # Calculate Final Weighted Rating
    weighted_scores = [
        score * weights[criterion] for criterion, score in ratings
    ]
    
    final_rating = sum(weighted_scores)

    # Scale the final rating to a 1-100 range
    final_rating_scaled = np.clip(final_rating * 10, 1, 100)

    # Return detailed breakdown and final rating (scaled from 1 to 100)
    return ratings, round(final_rating_scaled, 2)
 
def chatgpt_comment(prediction, details, symbol, input_parameters):
    # Construct the message components for OpenAI
    system_message = {
        "role": "system",
        "content": (
            "You are a financial advisor chatbot. Your job is to provide an insightful, "
            "clear, and balanced overview of the investment based on the input prediction, "
            "features, and detailed analysis provided."
            """More advices to keep in mind \n
Conversational Tone: Shift to a trader-like, conversational style to make the analysis more relatable and engaging. Mention each and everything given to you like market cap, volume etc.
Liquidity Section:
Simplify to one sentence 
Smart Money Activity: Include transaction totals to enhance clarity. Example: "Smart money is actively engaged, evidenced by significant transactions totaling $X in the last X hours“
Top 10 Holders: Add a timestamp for added context. Example: "Top 10 holders own 40% of the supply, as of last updated X seconds ago."
Humorous Tone for Conclusion: Replace generic final sentences with witty, memecoin-themed humor. Example for Miku: "Miku might not be a ‘one-hit wonder,’ but this token’s centralization might have you singing a different tune if the top holders start cashing out." 
"""
        )
    }
    system_example = {
        "role": "assistant",
        "content": (
            """
            $ME is currently at 8/10 investment score, sitting at a 512M mc a 10% decrease over the last 24hours. Liquidity and contract are clean✅ Social sentiment showed a 30% increase in 24hour mentions, seems there is lots to talk about. Volume steadily decreasing in line with mc suggesting slowing growth from the initial launch activity approximately 3 days ago. A long term hold seems favourable on such a project such as this one.
            """
        )
    }
    user_example = {
        "role": "user",
        "content": (
            "Prediction: 8\nCoin Symbol: ME"
            "Details: High smart money activity and positive sentiment score. "
            "Burned liquidity pool adds confidence. Top 10 holders' percent is above 70%, "
            "indicating some centralization risk."
        )
    }
    user_message = {
        "role": "user",
        "content": (
            f"Prediction: {prediction}\n"
            f"Symbol: {symbol}"
            f"Parmeters: {input_parameters}"
            f"Details: {details}\n"
        )
    }
    
    response = client.chat.completions.create(
            model="gpt-4",
            messages=[system_message,user_example, system_example, user_message],
            max_tokens=5000,
            temperature=0.8
        )
    comment = response.choices[0].message.content
    return comment

# Add technical indicators
import warnings
from ta.utils import dropna  # Ensure clean input for ta indicators

def add_technical_indicators(df):
    try:
        # Drop NaN values for compatibility
        df = dropna(df)

        # Add technical indicators
        df['rsi'] = ta.momentum.RSIIndicator(close=df['close']).rsi()
        macd = ta.trend.MACD(close=df['close'])
        df['macd'] = macd.macd()
        df['macd_signal'] = macd.macd_signal()
        df['ema_20'] = ta.trend.EMAIndicator(close=df['close'], window=20).ema_indicator()
        df['ema_50'] = ta.trend.EMAIndicator(close=df['close'], window=50).ema_indicator()
        df['sma_20'] = ta.trend.SMAIndicator(close=df['close'], window=20).sma_indicator()
        df['sma_50'] = ta.trend.SMAIndicator(close=df['close'], window=50).sma_indicator()
    except Exception as e:
        raise RuntimeError(f"Error adding technical indicators: {e}")

    # Drop NaN rows resulting from calculations
    df = df.dropna()
    return df


# Assign target based on future percentage change
def assign_target(df):
    df['future_close'] = df['close'].shift(-7)
    df['target'] = ((df['future_close'] - df['close']) / df['close']) * 100
    df['target'] = pd.cut(df['target'], bins=[-np.inf, -10, -5, 0, 5, 10, 15, 20, 25, 30, np.inf], 
                          labels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    df = df.dropna(subset=['target', 'future_close'])
    df['target'] = df['target'].astype(int)
    df = df.drop(columns=['future_close'])
    return df


# Interpret investment rating
def interpret_rating(prediction, details, symbol, input_parameters):
    """
    Interprets the investment rating and extracts the meaningful part of a comment after the first comma.
    
    Args:
        prediction (int): The predicted rating value.
        details (str): Additional details for the prediction.
        symbol (str): The symbol of the asset.
        input_parameters (dict): Input parameters used for the prediction.
    
    Returns:
        tuple: A tuple containing investment advice (str) and the processed comment (str).
    """
    # Generate the comment
    comment = chatgpt_comment(prediction, details, symbol, input_parameters)
    
    # Extract text after the first comma
    comment_parts = comment.split(",", 1)  # Split into 2 parts: before and after the first comma
    processed_comment = comment_parts[1].strip() if len(comment_parts) > 1 else comment.strip()
    
    # Determine investment advice based on prediction
    if prediction <= 3:
        advice = "Not Recommended"
    elif 4 <= prediction <= 6:
        advice = "Neutral"
    else:
        advice = "Recommended for Investment"

    return advice, processed_comment
  

def process_parameters(params):
    features = {
        "lp_status_burnt": 1 if params["liquidity"]["lp_status"] == "burnt" else 0,
        "top_10_holders_percent": params["holder_distribution"]["top_10_holders_percent"],
        "significant_transactions": params["smart_money_activity"]["significant_transactions"],
        "bundling": 1 if params["bundling"] else 0,
        "positive_sentiment_score": params["sentiment_analysis"]["positive_sentiment_score"],
        "cap_to_volume_ratio": params["market_cap"] / params["volume"] if params["volume"] > 0 else np.nan
    }
    return features


