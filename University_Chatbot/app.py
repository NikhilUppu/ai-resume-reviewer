from flask import Flask, request, jsonify, render_template
from chatbot_logic import get_response


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")  # loads HTML chat interface

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "").strip()

    if not user_input:
        return jsonify({"response": "Hi, I am your NAU chatbot! How can I help you?"})

    response = get_response(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
