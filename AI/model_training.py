import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from feature_engineering import add_technical_indicators, assign_target
from data_processing import get_crypto_data, process_parameters
import joblib

# File paths
MODEL_FILE = "crypto_rating_model.pkl"
FEATURES_FILE = "features_list.pkl"


# Save and load the model
def save_model(model, features):
    joblib.dump(model, MODEL_FILE)
    joblib.dump(features, FEATURES_FILE)
    print(f"Model and feature list saved to {MODEL_FILE} and {FEATURES_FILE}.")

def load_model():
    try:
        model_path = 'rating_prediction_model.pkl'
        label_encoder_path = 'label_encoder.pkl'
        model = joblib.load(model_path)
        label_encoder = joblib.load(label_encoder_path)
        return model, label_encoder
    except FileNotFoundError:
        print("No saved model or features found.")
        return None, None

# Train and save the model
def train_and_save_model(features, labels):
    try:
        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
        
        # Feature scaling
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)

        # Train RandomForest
        model = RandomForestClassifier(n_estimators=200, max_depth=15, random_state=42)
        model.fit(X_train_scaled, y_train)

        # Evaluate model accuracy
        accuracy = model.score(X_test_scaled, y_test)
        print(f"Model accuracy: {accuracy:.2f}")

        # Save model and scaler
        save_model(model, features.columns.tolist())
        return model
    except Exception as e:
        print(f"Training error: {e}")
        raise

def train_model_for_symbol(input_parameters):
    symbol = input_parameters["symbol"]
    print(f"Training model for {symbol}...")
    df = get_crypto_data(f"{symbol}USDT")
    
    df = add_technical_indicators(df)
    df = assign_target(df)
    labels = df['target']
    features = process_parameters(input_parameters, df)
    print("MAIN FEATURES", features)
    model = train_and_save_model(features, labels)
    print("Training complete. Model saved successfully.")
    return model, features
