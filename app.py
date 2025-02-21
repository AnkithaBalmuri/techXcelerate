from flask import Flask, render_template, request, jsonify
import os
from model import detect_deepfake, detect_fake_news

app = Flask(__name__)

# Route for homepage
@app.route('/')
def home():
    return render_template('index.html')

# API Route for Deepfake Detection
@app.route('/detect-deepfake', methods=['POST'])
def deepfake():
    if 'media' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['media']
    filename = os.path.join("uploads", file.filename)
    file.save(filename)

    result = detect_deepfake(filename)
    return jsonify({"result": result})

# API Route for Fake News Detection
@app.route('/detect-fake-news', methods=['POST'])
def fake_news():
    data = request.json
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data['text']
    result = detect_fake_news(text)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
