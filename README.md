# Sentinel — AI-Powered Fraud Detection (India MVP)

A lightweight prototype for real-time transaction fraud detection built for India's digital payments ecosystem (UPI & cards). This repo contains a React frontend and a FastAPI backend with a simple ML model (IsolationForest) trained on synthetic Indian-style transaction data (examples use Bhopal, ₹INR).

## Features (MVP)
- Real-time transaction scoring (`/score`)
- UPI / Card / Netbanking support in simulator
- Dashboard showing recent txns and flagged alerts
- Human-readable reasons for flagged txns
- Model training script (synthetic data) for demonstration

## Run (local)
1. Backend:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python model/train_model.py
uvicorn main:app --reload --port 8000
