# 🛡️ SatarkAI: AI-Powered Fraud Detection (India MVP)

**SatarkAI** is an AI-powered fraud detection system designed for India’s digital payments ecosystem — including **UPI**, **cards**, and **net banking**.  
It leverages **machine learning** to analyze transactions in real time, detect anomalies, and flag potentially fraudulent activity.  
The project is built with a **React frontend** and a **FastAPI backend** powered by a lightweight ML model.

---

## 🚀 Project Vision

India’s digital payments are expanding at an unprecedented rate, but fraud continues to pose a major challenge.  
SatarkAI aims to provide a **transparent**, **explainable**, and **easy-to-integrate** fraud detection solution for **banks, fintechs, and merchants**.  

The long-term vision is to make every Indian digital transaction **safe, secure, and fraud-free**.

---

## ✨ Key Features

- ⚡ **Real-time fraud scoring** via the `/score` API endpoint  
- 💳 **Supports UPI, Cards, and Net Banking** transactions  
- 📊 **Interactive dashboard** displaying recent transactions & alerts  
- 🔎 **Explainable AI:** clear, human-readable reasons for flagged transactions  
- 🛠️ **Model training script** with synthetic Indian-style transaction data  
- 🏦 **Customizable rules & thresholds** for fraud detection  

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js |
| **Backend** | FastAPI (Python) |
| **Machine Learning** | IsolationForest (scikit-learn) |
| **Database** | SQLite (for demo) |
| **Deployment** | Base44 (MVP Hosting) |
| **Version Control** | GitHub |

---
## 🧠 Example Transaction

**Request:**
```markdown
{
  "txn_id": "TXN12345",
  "user_id": "U001",
  "amount": 2500,
  "mode": "UPI",
  "location": "Bhopal",
  "time": "2025-08-30T10:30:00Z"
}
```

**Response:**
```markdown
{
  "fraud_score": 0.82,
  "is_fraud": true,
  "reason": "Unusual amount + location mismatch"
}
```


## 🔮 Future Scope

- ✅ Integration with **real UPI & banking APIs**  
- ✅ Advanced ML models (**XGBoost**, **Deep Learning**)  
- ✅ Mobile app for **real-time fraud alerts**  
- ✅ **Blockchain-based** transaction verification  
- ✅ **Multi-language support** (English + Hindi)  

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

## 🌍 Acknowledgments

- **Inspiration:** India’s growing UPI ecosystem  
- **Open-source libraries:** FastAPI, scikit-learn, React  
- **Built as:** A prototype for **hackathon and MVP testing**
