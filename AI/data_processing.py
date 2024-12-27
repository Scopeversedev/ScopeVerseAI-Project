import numpy as np
import requests
import pandas as pd
import requests
import pandas as pd
import random


# Global cache for storing fetched data
cache = {}
def get_crypto_data(symbol, interval='1d', limit=1000, related_coins=None, retries=3):
    """
    Fetches historical crypto data for a given symbol from Binance.
    Uses a cache to store and retrieve data for repeated calls.
    If the data is empty or fetching fails, retries for a limited number of attempts.
    """
    if symbol in cache:
        print(f"Data for {symbol} fetched from cache.")
        return cache[symbol]

    if related_coins is None:
        related_coins = ['ADAUSDT', 'AVAXUSDT', 'DOTUSDT', 'MATICUSDT', 'LTCUSDT']
    
    if retries <= 0:
        print(f"Max retries reached for {symbol}. Returning None.")
        return None  # Stop recursion after retries are exhausted

    url = f'https://api.binance.com/api/v3/klines?symbol={symbol}&interval={interval}&limit={limit}'
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to fetch data for {symbol}. Retrying with a related coin...")
        return get_crypto_data(random.choice(related_coins), interval, limit, related_coins, retries - 1)
    
    data = response.json()
    if not data:
        print(f"No data returned for {symbol}. Retrying with a related coin...")
        return get_crypto_data(random.choice(related_coins), interval, limit, related_coins, retries - 1)
    
    # Convert the data into a DataFrame
    df = pd.DataFrame(data, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume', 'close_time',
                                     'quote_asset_volume', 'number_of_trades', 
                                     'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore'])
    
    # Convert timestamp to datetime and set as index
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
    df.set_index('timestamp', inplace=True)
    
    # Use only relevant columns and ensure they are floats for proper calculations
    df = df[['open', 'high', 'low', 'close', 'volume']].astype(float)
    
    if df.empty:
        print(f"Data for {symbol} is empty. Retrying with a related coin...")
        return get_crypto_data(random.choice(related_coins), interval, limit, related_coins, retries - 1)
    
    # Store the fetched data in the cache
    cache[symbol] = df
    print(f"Data for {symbol} saved to cache.")
    
    return df

# Process given parameters into features
def process_parameters(params, df):
    # Process parameters and create a feature DataFrame for each row in the DataFrame (df)
    features = []
    for _, row in df.iterrows():
        feature = {
            "lp_status_burnt": 1 if params["liquidity"]["lp_status"] == "burnt" else 0,
            "top_10_holders_percent": params["holder_distribution"]["top_10_holders_percent"],
            "significant_transactions": params["smart_money_activity"]["significant_transactions"],
            "bundling": 1 if params["bundling"] else 0,
            "positive_sentiment_score": params["sentiment_analysis"]["positive_sentiment_score"],
            "cap_to_volume_ratio": params["market_cap"] / params["volume"] if params["volume"] > 0 else np.nan
        }
        features.append(feature)
    return pd.DataFrame(features)  # Return a

import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def process_prediction(prediction, features):
    """
    Adjust the given prediction based on provided feature values.
    
    Args:
        prediction (float): The initial prediction value.
        features (dict): A dictionary containing feature values.

    Returns:
        tuple: Adjusted prediction and explanation details.
    """
    # Configuration values for adjustments
    top_10_threshold = 20
    sentiment_threshold = 0.4
    transactions_threshold = 10
    low_cap_to_volume_ratio = 5.0
    
    details = []
    original_prediction = prediction
    
    # Adjust for top 10 holders percentage
    top_10_percent = features.get("top_10_holders_percent", 0)
    if top_10_percent >= top_10_threshold:
        prediction += 2
        details.append("Increased prediction due to high top_10_holders_percent (>= 20%).")
    else:
        prediction -= 2
        details.append("Decreased prediction due to low top_10_holders_percent (< 20%).")
    
    # Adjust for sentiment score
    sentiment_score = features.get("positive_sentiment_score", 0)
    if sentiment_score > sentiment_threshold:
        prediction += 2
        details.append("Increased prediction due to positive_sentiment_score (> 0.4).")
    
    # Adjust for significant transactions
    significant_transactions = features.get("significant_transactions", 0)
    if significant_transactions >= transactions_threshold:
        prediction += 1
        details.append("Increased prediction due to high significant_transactions (>= 10).")
    
    # Adjust for liquidity pool status
    lp_status_burnt = features.get("lp_status_burnt", 0)
    if lp_status_burnt == 1:
        prediction += 1
        details.append("Increased prediction due to lp_status_burnt being burnt.")
    else:
        prediction -= 1
        details.append("Decreased prediction due to lp_status_burnt not being burnt.")
    
    # Adjust for cap-to-volume ratio
    cap_to_volume_ratio = features.get("cap_to_volume_ratio", float('inf'))
    if cap_to_volume_ratio < low_cap_to_volume_ratio:
        prediction += 3
        details.append("Increased prediction due to low cap_to_volume_ratio (< 5).")
    else:
        prediction -= 1
        details.append("Decreased prediction due to high cap_to_volume_ratio (>= 5).")
    
    # Adjust for bundling factor
    bundling = features.get("bundling", 0)
    if bundling == 1:
        prediction -= 1
        details.append("Decreased prediction due to bundling being True.")
    else:
        prediction -= 1
        details.append("Decreased prediction due to bundling being False.")
    
    
    # Log the details
    for detail in details:
        logger.info(detail)
    
    return prediction, "\n".join(details)
