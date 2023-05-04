from flask import Flask, render_template, request, jsonify
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
#Flask initialization
app = Flask(__name__)
chatbot=ChatBot('Pythonscholar')
# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)
# Now let us train our bot with multiple corpus
trainer.train("chatterbot.corpus.english.greetings","chatterbot.corpus.english.conversations")
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/get", methods=["GET","POST"])
def chatbot_response():
    data = request.get_json()
    msg = data["msg"]
    response = chatbot.get_response(msg)
    response = str(response)
    print(response)
    return response
if __name__ == "__main__":
 app.run()