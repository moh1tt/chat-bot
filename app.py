from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import chatbot_response

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/predict")
def predict():
    message = request.get_json().get("message")
    response = chatbot_response(message)
    message = {"answer": response}
    return jsonify(message)


# if __name__ == "__main__":
#     app.run(port=5050)
