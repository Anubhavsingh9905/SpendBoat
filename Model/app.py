import os
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.pkl')
vectrozier = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if "message" not in data:
            return jsonify({"error": "No message provided"}), 400
        
        message = data.get('message', '')
        
        
        if len(message) == 0:
            return jsonify({"error": "No message provided"}), 400
        
        X_vec = vectrozier.transform([message])
        prediction = model.predict(X_vec)[0]
        
        return jsonify({'category': prediction})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8080, debug=True)