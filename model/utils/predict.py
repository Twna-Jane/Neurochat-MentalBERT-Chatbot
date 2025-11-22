import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Path to your locally saved MentalBERT binary model
MODEL_PATH = "./mentalbert-2class"  
print("🔹 Loading MentalBERT binary model from:", MODEL_PATH)

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Binary label mapping
LABELS = ["No Depression", "Depression"]

def predict_text(text: str):
    """
    Runs inference using a binary MentalBERT model.
    Returns predicted label and confidence.
    Adds a lexical rule layer for severe crisis indicators.
    """
    # --- Step 1: Crisis keyword rule (helps with underprediction) ---
    crisis_keywords = ["suicidal", "kill myself", "end my life", "die", "hopeless", "worthless"]
    if any(kw in text.lower() for kw in crisis_keywords):
        return {"prediction": "Depression", "confidence": 0.99}

    # --- Step 2: Tokenize and predict ---
    inputs = tokenizer(
        text,
        padding=True,
        truncation=True,
        max_length=128,
        return_tensors="pt"
    ).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=-1)
        pred_idx = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred_idx].item()

    # --- Step 3: Prepare final prediction ---
    prediction = LABELS[pred_idx] if pred_idx < len(LABELS) else f"Class_{pred_idx}"
    return {
        "prediction": prediction,
        "confidence": round(confidence, 4)
    }


# Optional: quick local test
if __name__ == "__main__":
    samples = [
        "I feel happy and motivated today!",
        "I have been feeling sad and hopeless lately.",
        "I want to end my life. I don’t see any reason to live."
    ]
    for s in samples:
        result = predict_text(s)
        print(f"\n🧩 Input: {s}\n🔹 Prediction: {result}")
