import numpy as np
from model_training import train_model_for_symbol, load_model
from feature_engineering import interpret_rating, process_parameters, calculate_rating
from data_processing import process_prediction
import pandas as pd
from sklearn.preprocessing import RobustScaler  # Using RobustScaler instead of MinMaxScaler
import random
import time

# Global variables to avoid reloading the model and label encoder every time
model, label_encoder = None, None

def load_model_once():
    global model, label_encoder
    if model is None or label_encoder is None:
        model, label_encoder = load_model()
    return model, label_encoder

def process_input(params, label_encoder):
    # Preprocess input data
    new_input_expanded = pd.json_normalize([params])

    # Handle missing values in new data if necessary
    new_input_expanded.fillna(0, inplace=True)

    # Encoding categorical variables in the new input (same way as the training data)
    if 'liquidity.lp_status' in new_input_expanded.columns:
        new_input_expanded['liquidity.lp_status'] = label_encoder.transform(new_input_expanded['liquidity.lp_status'])

    # Drop non-numeric columns in new input (e.g., 'address', 'symbol', 'name')
    new_input_expanded = new_input_expanded.drop(columns=['address', 'symbol', 'name'], errors='ignore')
    
    return new_input_expanded

def main(input_parameters):
    start_time = time.time()  # Start measuring time

    # Load model once instead of reloading it
    model, label_encoder = load_model_once()

    # Train the model and get feature names (can potentially be optimized or pre-calculated if applicable)
    test_predict, final_predict = calculate_rating(input_parameters)
    print(test_predict, "Conditional Prediction")
    print(final_predict, "Conditional Prediction")
    
    # Process features from the input parameters
    features = process_parameters(input_parameters)
    print("Processed Features: ", features)  # Debugging the processed features
    input_params = process_input(input_parameters, label_encoder)

    # Predict using the model
    prediction_org = model.predict(input_params)[0]
    print(f"Original Prediction: {prediction_org}")  # Debugging the original prediction
    prediction, explaination = process_prediction(prediction_org, features)

    # Ensure that the prediction stays within a reasonable range
    market_cap = input_parameters["market_cap"] if not isinstance(input_parameters["market_cap"], pd.Series) else input_parameters["market_cap"].iloc[0]
    if market_cap < 50000:
        prediction = prediction_org
    else:
        prediction = final_predict

    # Interpret the prediction to get investment advice
    investment_advice, comment = interpret_rating(prediction, explaination, input_parameters["symbol"], input_parameters)
    
    end_time = time.time()  # End measuring time
    execution_time = end_time - start_time  # Calculate time taken to execute
    print(f"Execution Time: {execution_time:.2f} seconds")  # Print the execution time
    
    return prediction, investment_advice, comment

if __name__ == "__main__":
    input_parameters = {
        "address": "9FvpCT5fWzskUW7RTQDM9yBj6txYPt4X3aSc1WVKpump",  # A unique address
        "market_cap": 500000000,  # High market cap
        "symbol": "OPTIMUS",
        "name": "Optimus Prime Coin",
        "volume": 150000000.0,  # High trading volume
        "price_change": {
            "last_24h": 5.25,  # Positive price change in the last 24 hours
            "last_6h": 3.15,   # Positive price change in the last 6 hours
            "last_1h": 1.10    # Positive price change in the last 1 hour
        },
        "volumeDetails": {
            "24h": {
                "total": 150000000.0,  # High trading volume in 24 hours
                "sell": 5000000,       # High sell volume
                "buy": 8000000         # High buy volume
            },
            "6h": {
                "total": 70000000.0,  # High trading volume in 6 hours
                "sell": 2500000,      # High sell volume
                "buy": 4000000        # High buy volume
            }
        },
        "liquidity": {
            "lp_status": "active"  # Liquidity is active (good sign)
        },
        "holder_distribution": {
            "top_10_holders_percent": 0.25  # Low concentration, good decentralization
        },
        "smart_money_activity": {
            "significant_transactions": 15  # High number of significant transactions (smart money activity)
        },
        "bundling": True,  # Bundling is present, indicating higher utility and growth potential
        "sentiment_analysis": {
            "positive_sentiment_score": 85  # High positive sentiment score
        }
    }

    prediction, investment_advice, comment = main(input_parameters)
    print(f"Final Prediction: {prediction}")
    print(f"Investment Advice: {investment_advice}")
    print(f"Comment: {comment}")
