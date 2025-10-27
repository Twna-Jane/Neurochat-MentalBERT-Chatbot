[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/inoLPW_E)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20099703&assignment_repo_type=AssignmentRepo)


#  Neurochat: MentalBERT Health Chatbot for Depression Diagnosis

This project is an **AI-powered mental health assistant** that allows patients to express their emotions and receive an **early screening of depression risk** levels (Low, Moderate, or High).  
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
- Fine-tuned **MentalBERT** model for depression risk classification
- Supports risk levels: **Low**, **Moderate**, and **High**
- Trained using questionnaire-based datasets (PHQ-9–like questions)
- Model exported via Hugging Face / Flask API for backend inference

###  Backend (Node.js + Express)
- RESTful API for chatbot inference and user role management
- Integrates with Firebase Admin SDK for data verification
- Handles secure JWT-based sessions and token validation

---

##  Project Structure
```
neurochat-mentalbert/
│── backend/                   # Node.js + Express API
│   ├── routes/                # API endpoints (auth, chatbot)
│   ├── controllers/           # Chat logic & ML inference
│   ├── config/firebase.js     # Firebase Admin SDK setup
│   └── server.js              # Entry point
│
│── frontend/                  # React app (UI)
│   ├── src/pages/             # Login, Signup, Chatbot, Profile
│   ├── src/components/        # Reusable UI components
│   ├── src/context/           # Auth & role context
│   └── src/App.js             # Routes
│
│── model/                     # Model training (Colab)
│   ├── train_mentalbert.ipynb # Fine-tuning notebook
│   └── saved_model/           # Trained model files
│
│── dataset/                   # Depression dataset (CSV)
│── README.md                  # Documentation
│── .env.example               # Environment variables
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

### Dataset
A structured CSV file (e.g., `Depression.csv`) with survey-like responses:
| Q1 | Q2 | ... | Q9 | Depression Label |
|----|----|-----|----|------------------|
| 3  | 2  | 4   | 3  | Moderate Depression |

Converted into:
- `risk_label` = 0 (Low), 1 (Moderate), 2 (High)

### Training Steps
1. Open `train_mentalbert.ipynb` in **Google Colab**
2. Mount Google Drive & upload dataset  
3. Run all cells to fine-tune **MentalBERT**
4. Export the trained model to `/saved_model/`
5. Deploy using a Flask or FastAPI backend for inference

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
5. Model returns **Low / Moderate / High Risk** prediction + recommendations.

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


