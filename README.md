[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/inoLPW_E)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20099703&assignment_repo_type=AssignmentRepo)


#  Neurochat: MentalBERT Health Chatbot for Depression Diagnosis

This project is an **AI-powered mental health assistant** that allows patients to express their emotions and receive an **early screening of depression risk** levels (Normal or Depressed).  
The system combines **Natural Language Processing (NLP)** using **MentalBERT** with a **React + Firebase** web application for secure, role-based interactions.

>  **Disclaimer**: This tool is for **educational and research purposes only**.  
> It is **not intended** to replace professional medical advice, diagnosis, or treatment.

---

##  Features

###  Frontend (React + Firebase)
- Modern UI built with **React + TailwindCSS**
- Role-based authentication via **Firebase Auth** (Patient, Clinician, Admin)
- **OTP-based login** using Firebase phone verification
- **Real-time Firestore data** for user profiles and chat history
- Interactive **chatbot interface** for depression screening

###  Machine Learning (MentalBERT)
- Machine Learning (MentalBERT + Custom Fine-Tuning)
-Fine-tuned MentalBERT model for:
Normal
Depressed
Hugging Face Transformers (PyTorch)
-Model served via Python API (Flask)

###  Backend (Node.js + Express)
- RESTful API for chatbot inference and user role management
- Integrates with Firebase Admin SDK for data verification
- Handles secure JWT-based sessions and token validation

---

##  Project Structure
```
neurochat-mentalbert-chatbot/
│
├── backend/                        # Node.js + Express API
│   ├── routes/
│   ├── controllers/
│   ├── config/firebase.js
│   └── server.js
│
├── frontend/                       # React application
│   ├── src/pages/
│   ├── src/components/
│   ├── src/context/
│   └── src/App.js
│
├── model/                          # ML training + inference
│   ├── app.py                      # Flask API for model inference
│   ├── utils/predict.py            # Preprocessing + model loader
│   ├── Mentalbert-2class/          # (Ignored in Git) Trained MentalBERT weights
│   ├── meantal-health-gemma3/      # (Ignored in Git) Optional large LLM weights
│   ├── train_mentalbert.ipynb      # Training Notebook
│   └── requirements.txt
│
├── dataset/                        # Training data (CSV)
│   └── depression_data.csv
│
├── .gitignore                      # Ignores model folders
├── README.md
└── .env.example

```

---

## Environment Variables

###  Backend `.env`
```bash
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
MODEL_API_URL=http://localhost:8000/predict
JWT_SECRET=your_jwt_secret
```

###  Frontend `.env`
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_API_URL=http://localhost:5000/api
```

---

##  Model Training (MentalBERT)

#  Dataset Description (Normal vs Depressed)
-Trained model using a two-class labelled dataset:

# Text Input	Label
“I feel okay today.”	Normal
“I haven't slept for days and I feel hopeless.”	Depressed
✨ Labels Used
     0 → Normal  
     1 → Depressed
# Dataset Workflow
-Loaded CSV data
-Cleaned & preprocessed text (lowercasing, punctuation removal, tokenization)

-Split into:
Train (80%)
Validation (10%)
Test (10%)
Feature Extraction

-Tokenized using BERT tokenizer
-Converted text → numerical IDs

Applied:
-Attention masks
-Padding

-Labels mapped to integers (0,1)
No one-hot encoding needed (BERT handles this through embeddings)

#  Model Training (MentalBERT Fine-Tuning)

# Training pipeline inside Mentalbert.ipynb:
-Load MentalBERT from Hugging Face
-Tokenize dataset

# Configure training:
-Cross-entropy loss
-AdamW optimizer
-Learning rate scheduler
-Mixed precision (fp16)
-Train for 3–5 epochs

# Evaluate using:
Accuracy
F1-score
Confusion Matrix
Save model into:
 model/Mentalbert-2class/


---

## 🔧 Installation & Setup

### Backend (Express + Firebase Admin)
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend (React + Firebase)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

###  Model Server (Optional - Python)
```bash
cd model
python app.py
```

---

## Usage

1. **Register/Login** using Firebase (OTP-based).  
2. **Patients** chat with the AI to describe symptoms.  
3. **Clinicians** review patient risk assessments.  
4. **Admins** manage system users and access levels.  
5. Model returns **Normal/Depressed** prediction + recommendations.

---

##  Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React, TailwindCSS, Firebase Auth |
| **Backend** | Node.js, Express, Firebase Admin SDK |
| **Database** | Firestore |
| **ML Model** | Hugging Face Transformers (MentalBERT, PyTorch) |
| **Deployment** | Colab (training), Express API (inference) |

---

##  Contributors
- **Tiffany Ndungi** – Full-stack Developer & ML Engineer  
- **Hugging Face** – Pretrained MentalBERT model  
- **Google Firebase** – Authentication & Firestore backend  

---

## ⚠️ Disclaimer
This project is **for academic and research purposes** only.  
It should not be used for real clinical diagnosis or emergency cases.  
If you are struggling, please reach out to a **mental health professional**.

---

> *Built with compassion to advance AI for mental health awareness.* 💙  

