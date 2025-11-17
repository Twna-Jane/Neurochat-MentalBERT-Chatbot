[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/inoLPW_E)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20099703&assignment_repo_type=AssignmentRepo)


# Neurochat: MentalBERT Health Chatbot for Depression Screening

This project is an AI-powered mental health assistant designed to allow users to express their emotions and receive an early screening of depression.
The system integrates a fine-tuned MentalBERT model with a React + Firebase web platform for secure, role-based interactions.

Disclaimer: This chatbot is for academic and research purposes only.
It is not a medical diagnostic tool and should not replace professional care.

#  Features
#  Frontend (React + Firebase)

Modern UI built with React + TailwindCSS

Firebase Authentication with OTP login

Role-based access: Patient, Clinician, Admin

Real-time chat with Firestore updates

Clean user experience with session persistence

#  Machine Learning (MentalBERT)

MentalBERT fine-tuned for binary classification

Predicts:

# Normal (0)

# Depressed (1)

Trained using Reddit depression dataset and cleaned textual responses

Model deployed via a lightweight Python inference server

# Backend (Node.js + Express)

REST API for prediction requests and role validation

Firebase Admin SDK for secure token handling

Supports real-time patient-clinician review workflow

#  Updated Project Structure
neurochat-mentalbert/
│── backend/
│   ├── routes/               # API endpoints (auth, chatbot)
│   ├── controllers/          # Chat logic and ML inference
│   ├── utils/                # Helpers (token validation, error handling)
│   ├── config/firebase.js    # Firebase Admin setup
│   └── server.js             # Main server entry
│
│── frontend/
│   ├── src/pages/            # Login, Dashboard, Clinician Panel, Chatbot
│   ├── src/components/       # UI components
│   ├── src/context/          # Auth & role context
│   ├── src/services/         # API communication
│   └── src/App.js            # Routes and navigation
│
│── model/
│   ├── train_mentalbert.ipynb   # Fine-tuning notebook
│   ├── utils/                    # Tokenizer + prediction utilities
│   ├── app.py                    # Python inference server (Flask/FastAPI)
│   ├── saved_model/              #  Ignored in Git (.gitignore)
│   └── tokenizer/                # Tokenizer files
│
│── dataset/
│   ├── depression_clean.csv      # Training dataset
│   └── README.md                 # Dataset description
│
│── .gitignore
│── README.md
│── .env.example

#  Environment Variables
# Backend .env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
MODEL_API_URL=http://localhost:8000/predict
JWT_SECRET=your_jwt_secret

# Frontend .env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000/api

#  Model Training (Updated for Binary Classification)
# Dataset

The model is trained on a cleaned Reddit depression dataset containing two classes:

Text	Label
"I haven't slept well for weeks..."	1 (Depressed)
"Feeling good today, went for a walk."	0 (Normal)
Labels

Normal → 0

Depressed → 1

Training Pipeline

Load dataset using load_dataset()

Clean text (remove URLs, emojis, duplicate spaces)

Tokenize using AutoTokenizer(MentalBERT)

# Train model with:

80% training

10% validation

10% testing

Evaluate accuracy, loss, and Confusion Matrix

Export model to saved_model/

Evaluation Metrics

Training Accuracy

Validation Accuracy

Loss Curve

Classification Report (Precision, Recall, F1)

Confusion Matrix

(Screenshots of:)

Training loss curve

Confusion Matrix

Accuracy per epoch

#  Installation & Setup
# Backend
cd backend
npm install
cp .env.example .env
npm start

# Frontend
cd frontend
npm install
cp .env.example .env
npm start

# Model Inference Server
cd model
python app.py

#  Usage Workflow

User signs in using Firebase OTP.

The chatbot prompts: "How are you feeling today?"

User writes a message.

The message is sent to the backend → ML Model.

Model predicts:

0 (Normal)

1 (Depressed)

Clinicians review patient results through a dashboard.

Admins manage user roles.

#  Tech Stack
Layer	Tools
Frontend	React, Tailwind, Firebase Auth
Backend	Node.js, Express, Firebase Admin
ML Model	MentalBERT, PyTorch, Transformers
Database	Firestore
Deployment	Colab (training), Local/Server API (inference)

#  Contributors

Tiffany Ndungi – Full-Stack Developer & ML Engineer

Hugging Face – MentalBERT pretrained model

#  Medical Disclaimer

This project is ONLY for academic and research exploration.
If you or someone you know is struggling, please contact a mental health professional immediately.


