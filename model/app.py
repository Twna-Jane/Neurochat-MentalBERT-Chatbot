from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline, AutoModelForCausalLM
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Paths to models

MENTALBERT_PATH = "./mentalbert-2class"
GEMMA_PATH = "./mental-health-gemma3"  


# Load MentalBERT classifier

tokenizer_cls = AutoTokenizer.from_pretrained(MENTALBERT_PATH)
model_cls = AutoModelForSequenceClassification.from_pretrained(MENTALBERT_PATH)


# Load Gemma conversational model

tokenizer_gemma = AutoTokenizer.from_pretrained(GEMMA_PATH)
model_gemma = AutoModelForCausalLM.from_pretrained(GEMMA_PATH)

# Create pipeline for convenience
generator = pipeline(
    "text-generation",
    model=model_gemma,
    tokenizer=tokenizer_gemma,
    device=0 if torch.cuda.is_available() else -1
)


# Utility function: classify text

def classify_text(text):
    inputs = tokenizer_cls(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model_cls(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
        predicted_class = torch.argmax(probs, dim=1).item()
        confidence = probs[0][predicted_class].item()
    labels = ["normal", "depressed"]
    prediction = labels[predicted_class] if predicted_class < len(labels) else "unknown"
    return prediction, round(confidence, 4)

# Utility function: generate response

def generate_response(user_text, max_tokens=32):
    output = generator([{"role": "user", "content": user_text}],
                       max_new_tokens=max_tokens,
                       return_full_text=False)[0]
    return output["generated_text"]


# Endpoint: classification only

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    prediction, confidence = classify_text(text)

    return jsonify({
        "prediction": prediction,
        "confidence": confidence
    })


# Endpoint: chat + classification

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("text", "")

    if not user_message:
        return jsonify({
            "reply": "I'm here to listen. How are you feeling today?",
            "prediction": "unknown",
            "confidence": 0
        })

    # Step 1: Classify message
    prediction, confidence = classify_text(user_message)

    # Step 2: Generate Gemma reply
    try:
        reply = generate_response(user_message)
    except Exception as e:
        print("Gemma model error:", e)
        reply = "Sorry, something went wrong with the chatbot."

    return jsonify({
        "reply": reply,
        "prediction": prediction,
        "confidence": confidence
    })


# Run the Flask app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
