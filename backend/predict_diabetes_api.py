from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import traceback
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Diabetes Prediction API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model_lr = joblib.load("../model_training/modelo_lr.pkl")
    scaler = joblib.load("../model_training/scaler.pkl")
except Exception:
    print("Error cargando modelo LR o scaler")
    traceback.print_exc()
    model_lr = None
    scaler = None

class PatientData(BaseModel):
    Pregnancies: float
    Glucose: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

@app.post("/predict/logistic_regression")
def predict_lr(data: PatientData):
    if model_lr is None or scaler is None:
        raise HTTPException(status_code=500, detail="Modelo LR o scaler no disponibles")
    try:
        X = np.array([[data.Pregnancies, data.Glucose, data.Insulin, data.BMI,
                       data.DiabetesPedigreeFunction, data.Age]])
        X_scaled = scaler.transform(X)
        pred = model_lr.predict(X_scaled)[0]
        proba = model_lr.predict_proba(X_scaled)[0,1]
        return {"model": "LogisticRegression", "prediction": int(pred), "probability": float(proba)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))