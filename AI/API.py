from flask import Flask, request, jsonify
from main import main
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()

secret_key = os.getenv('OPENAI')
client = OpenAI(api_key = secret_key)
app = Flask(__name__)
CORS(app)
def generate_chatbot_response(user_message):
    # Define Scope's personality and behavior
    system_message = {
        "role": "system",
        "content": (
            "You are Scope, a customer support chatbot for Scopeverse.ai. Your personality is funny, sarcastic, and witty. "
            "You provide accurate information about Scopeverse.ai and its services, features, and website. "
            "The scope verse website is an awesome website it allows people to add the address of a token and get its scores like should we invest in the coin or not and gives info of the coin as well, It is a meme coin."
            "If the user asks something unrelated (e.g., math, weather, writing, jokes), redirect them politely to explore the website or ask a relevant query. "
            "You must not attempt to answer unrelated questions. Example response to unrelated queries: "
            "'I see you’re testing my boundaries, but I’m here to assist with Scopeverse.ai only. Check out our website for something truly amazing!' "
        )
    }

    # Example interaction to define personality and behavior
    system_example = {
        "role": "assistant",
        "content": "I'm sorry, but I can't assist with that. My focus is on providing information related to dissertation writing help. If you have any questions about that, feel free to ask!"
    }

    user_example = {
        "role": "user",
        "content": "What is 5 + 5 * 5"
    }

    # Define the user's input message
    user_message_data = {
        "role": "user",
        "content": user_message
    }

    try:
        # Create a chat completion request using `client`
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[system_message, user_example, system_example, user_message_data],
            max_tokens=200,
            temperature=0.7
        )

        # Extract the chatbot's reply
        chatbot_reply = response.choices[0].message.content
        return chatbot_reply
    except Exception as e:
        return f"Oops! Even I can't handle this right now. Maybe ask again? Error: {e}"
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    response = generate_chatbot_response(user_message)
    return jsonify({"response": response})

@app.route('/chatgpt-comment', methods=['POST'])
def generate_sarcastic_comment():
    data = request.get_json()
    symbol = data.get('symbol')
    profit = data.get('profit')
    holdtime = data.get('holdtime')
    # Define the system message to set the assistant's behavior
    system_message = {
        "role": "system",
        "content": (
            "You are a sarcastic financial advisor who specializes in cryptocurrency investments. "
            "All of the records that are provided are expected rates not actual values, So you need to like type a recommending comment"
            "Use emojis to emphasize humor. Don't repeat the percentage or holding time just add a comment like the one given below."
            "Example Response: Who needs sleep when the gains keep coming? 🤑"
        )
    }
    system_example = {
        "role" : "assistant" ,
        "content" : (
            "Who needs sleep when the gains keep coming? 🤑"
        )
    }
    user_example = {
        "role" : "user",
        "content" :  (
        "📈 Paper Trade Result: $MOONSHOT"
        "Profit: +50%"
        "Hold Time: 6 hours"
        )
    }
    # Define the user message with the specific inputs
    user_message = {
        "role": "user",
        "content": (
            f"📈 Paper Trade Result: ${symbol}"
            f"Profit: +{profit}%"
            f"Hold Time: {holdtime}"
        )
    }
    
    # Create the chat completion request
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[system_message,user_example, system_example, user_message],
            max_tokens=1500,
            temperature=0.8
        )
        sarcastic_comment = response.choices[0].message.content
        return jsonify({"comment": sarcastic_comment})
    except Exception as e:
        return f"Oops, the sarcasm generator hit a snag. Maybe invest in fixing that first. Error: {e}"

@app.route('/', methods=['GET'])
def main_screen():
    try:
        return "This is Our Coin Rating API KEY"
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/coin-rating', methods=['POST'])
def coin_rating():
    try:
        # Parse the JSON body
        data = request.get_json()

        # Validate that the data is a dictionary with expected fields
        if not isinstance(data, dict):
            return jsonify({"error": "Request body must be a JSON object"}), 400
        
        # Validate required fields (basic checks)
        required_fields = [
            "market_cap", "symbol", "name", "volume",
            "liquidity", "holder_distribution", 
            "smart_money_activity", "bundling", "sentiment_analysis"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Pass the validated data to the main function to get the coin rating
        result = main(data)
        coin_rating = int(result[0])  # Assuming result[0] is the rating (an integer)
        advice = str(result[1])       # Assuming result[1] is the advice (a string)
        comment = str(result[2])

        # Return the result including the rating, advice, and sarcastic post
        return jsonify({
            "rating": coin_rating,
            "advice": advice,
            "comment" : comment,
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
