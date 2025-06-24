from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import traceback

app = FastAPI(title="Diabetes Prediction API")

# Cargar modelos y scaler al iniciar la app
try:
    model_lr = joblib.load("../model_training/modelo_lr.pkl")
    scaler = joblib.load("../model_training/scaler.pkl")
except Exception:
    print("Error cargando modelo LR o scaler")
    traceback.print_exc()
    model_lr = None
    scaler = None

try:
    from pycaret.classification import load_model, predict_model
    model_pycaret = load_model("../model_training/modelo_diabetes_pycaret")
except Exception:
    print("Error cargando modelo PyCaret")
    traceback.print_exc()
    model_pycaret = None

# Modelo input para validar entrada JSON (con todas las columnas)
class PatientData(BaseModel):
    Pregnancies: float
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: float

@app.post("/predict/logistic_regression")
def predict_lr(data: PatientData):
    if model_lr is None or scaler is None:
        raise HTTPException(status_code=500, detail="Modelo LR o scaler no disponibles")
    try:
        # Orden correcto de columnas para el modelo y scaler
        X = np.array([[data.Pregnancies, data.Glucose, data.BloodPressure,
                       data.SkinThickness, data.Insulin, data.BMI,
                       data.DiabetesPedigreeFunction, data.Age]])
        X_scaled = scaler.transform(X)
        pred = model_lr.predict(X_scaled)[0]
        proba = model_lr.predict_proba(X_scaled)[0,1]
        return {"model": "LogisticRegression", "prediction": int(pred), "probability": float(proba)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict/pycaret")
def predict_pycaret(data: PatientData):
    if model_pycaret is None:
        raise HTTPException(status_code=500, detail="Modelo PyCaret no disponible")
    try:
        import pandas as pd
        df = pd.DataFrame([data.dict()])
        print("Dataframe recibido para PyCaret:")
        print(df.head())
        print("Columnas del dataframe:")
        print(df.columns.tolist())

        # PyCaret espera todas las columnas originales
        predictions = predict_model(model_pycaret, data=df)
        pred = int(predictions.loc[0, 'Label'])
        proba = float(predictions.loc[0, 'Score'])
        return {"model": "PyCaret", "prediction": pred, "probability": proba}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
