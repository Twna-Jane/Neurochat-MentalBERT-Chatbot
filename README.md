[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/inoLPW_E)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20099703&assignment_repo_type=AssignmentRepo)

# Neurochat: MentalBERT Health Chatbot for Depression Diagnosis

This project is an intelligent chatbot designed to assist patients in expressing their feelings and symptoms. The chatbot leverages **MentalBERT**, a transformer-based language model fine-tuned for mental health text classification, to provide:  

- Early **screening** of Depression risks (low, medium, high).  
- Supportive **recommendations** based on user input.  
- A secure **web interface** where patients can interact with the chatbot.  

 **Disclaimer**: This tool is for research and educational purposes only. It is **not a substitute** for professional medical advice, diagnosis, or treatment.

---

## Features
- **Frontend (ReactJS)**  
  - Patient login/signup with OTP verification  
  - Role-based authentication (patient, clinician, admin)  
  - Chatbot interface for symptom reporting and diagnosis  

- **Backend (Node.js + Express)**  
  - REST API for authentication & chatbot responses  
  - Secure JWT-based session handling  
  - Routes for patient, clinician, and admin roles  

- **Machine Learning (Colab + MentalBERT)**  
  - Fine-tuned MentalBERT model for depression-risk classification  
  - Supports binary (`depressed/normal`) and extended (`low/medium/high`) risk levels  
  - Exposed via API for predictions  

---

## Project Structure
```
mental-health-chatbot/
│── backend/                # Node.js + Express server
│   ├── routes/             # API routes
│   ├── controllers/        # Auth & chatbot logic
│   ├── models/             # MySQL/Sequelize models
│   └── server.js           # Entry point
│
│── frontend/               # React app
│   ├── src/pages/          # Login, Signup, Chatbot
│   ├── src/components/     # UI components
│   └── src/App.js          # Router setup
│
│── model/                  # ML Training (Colab notebooks)
│   ├── train_mentalbert.ipynb
│   └── saved_model/        # Exported fine-tuned model
│
│── dataset/                # Training dataset (CSV/JSON)
│── README.md               # Project documentation
│── .env.example            # Example environment variables
```

---

## ⚙️ Installation & Setup

### 1️ Backend (Express API)
```bash
cd backend
npm install
cp .env.example .env   
npm start
```

### 2️ Frontend (React App)
```bash
cd frontend
npm install
cp .env.example .env   
npm start
```

### 3️ Model Training (Colab)
- Open `model/train_mentalbert.ipynb` in Google Colab  
- Upload dataset (CSV/JSON)  
- Fine-tune **MentalBERT**  
- Export trained model (`saved_model/`)  
- Deploy using backend Flask API or TensorFlow.js  

---

## Environment Variables
Create `.env` files for both **backend** and **frontend**.

### Backend `.env`
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=mentalhealthdb
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧪 Usage
1. Register/login as **patient**.  
2. Navigate to **chatbot** interface.  
3. Enter your symptoms/feelings.  
4. Receive:  
   - **Risk prediction** (Low, Medium, High)  
   - **Recommendations** (self-care, professional help, etc.)  

---

## Dataset
- CSV format with columns: `text, label`  
- Labels: `normal`, `depressed`  
- Extended labels (`low`, `medium`, `high`) generated through preprocessing.  

---

## Tech Stack
- **Frontend**: React, TailwindCSS  
- **Backend**: Node.js, Express, MySQL  
- **Machine Learning**: MentalBERT (Hugging Face Transformers, PyTorch)  
- **Deployment**: Colab for training, Express API for inference  

---

## Contributors
- **Tiffany Ndungi (Developer)** – Full-stack & ML integration  
- **Hugging Face** – Pretrained MentalBERT model  

---

## Disclaimer
This project is a **research prototype** and must not be used as a replacement for professional healthcare services. If you are experiencing mental health challenges, please seek help from a qualified healthcare provider.

---

*Built with care to support mental health awareness and AI-driven solutions.*  

