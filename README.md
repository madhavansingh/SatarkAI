# SatarkAI: AI-Powered Fraud Detection (India MVP)

SatarkAI is an AI-powered fraud detection system designed for India's digital payments ecosystem (UPI, cards, and net banking).  
It uses machine learning to analyze transactions in real time, detect anomalies, and flag potentially fraudulent activity.  
This project is built with a **React frontend** and a **FastAPI backend** powered by a lightweight ML model.

---

## 🚀 Project Vision
India's digital payments are growing rapidly, but fraud remains a major concern.  
SatarkAI aims to provide a transparent, explainable, and easy-to-integrate fraud detection solution for banks, fintechs, and merchants.  
The long-term vision is to make every Indian digital transaction **safe, secure, and fraud-free**.

---

## ✨ Key Features
- ⚡ **Real-time fraud scoring** with `/score` API endpoint  
- 💳 **Supports UPI, Cards, and Net Banking transactions**  
- 📊 **Interactive dashboard** showing recent transactions & alerts  
- 🔎 **Explainable AI**: human-readable reasons for flagged transactions  
- 🛠️ **Model training script** with synthetic Indian-style transaction data  
- 🏦 **Customizable rules & thresholds** for fraud detection  

---

## 🖥️ Tech Stack
- **Frontend:** React.js  
- **Backend:** FastAPI (Python)  
- **Machine Learning:** IsolationForest (scikit-learn)  
- **Database:** SQLite (demo)  
- **Deployment:** Base44 (MVP hosting), future scope with GitHub & cloud  

---

## 🔮 Future Scope
- ✅ Integration with **real UPI & banking APIs**  
- ✅ Advanced ML models (XGBoost, Deep Learning for fraud detection)  
- ✅ Mobile app version for real-time fraud alerts  
- ✅ Blockchain-based transaction verification  
- ✅ Multi-language support (English + Hindi) for wider adoption  

---

## ⚡ How to Run (Local Setup)

### 1. Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # On Windows use `.venv\Scripts\activate`
pip install -r requirements.txt
python model/train_model.py
uvicorn main:app --reload --port 8000
2. Frontend Setup
cd frontend
npm install
npm start
The frontend will run at http://localhost:3000
The backend will run at http://localhost:8000
📌 Example Transaction
{
  "txn_id": "TXN12345",
  "user_id": "U001",
  "amount": 2500,
  "mode": "UPI",
  "location": "Bhopal",
  "time": "2025-08-30T10:30:00Z"
}
Response:
{
  "fraud_score": 0.82,
  "is_fraud": true,
  "reason": "Unusual amount + location mismatch"
}
📜 License
This project is licensed under the MIT License – free to use and modify.
🌍 Acknowledgments
Inspiration: India's growing UPI ecosystem
Open-source libraries: FastAPI, scikit-learn, React
Built as a prototype for hackathon & MVP testing
