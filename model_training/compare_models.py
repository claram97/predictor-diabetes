import pandas as pd
from pycaret.classification import *

# 1. Cargar CSV
df = pd.read_csv('diabetes.csv')
print("Columnas originales:")
print(df.columns.tolist())

# 2. Renombrar columnas para que sean simples y sin espacios
df.rename(columns={
    'pregnant': 'pregnant',
    'Plasma glucose concentration a 2 hours in an oral glucose tolerance test': 'glucose',
    'Diastolic blood pressure (mm Hg)': 'blood_pressure',
    'Triceps skin fold thickness (mm)': 'skin_thickness',
    '2-Hour serum insulin (mu U/ml)': 'insulin',
    'Body mass index (weight in kg/(height in m)^2)': 'bmi',
    'Diabetes pedigree function': 'diabetes_pedigree',
    'Age (years)': 'age',
    'Class variable (0 or 1) 268 of 768 are 1, the others are 0': 'outcome'
}, inplace=True)

# 3. Configurar PyCaret
clf = setup(
    data=df,
    target='Outcome',
    session_id=42,
    normalize=True,
    verbose=False
)

# 4. Comparar modelos y elegir el mejor
best_model = compare_models()

# print("\n=== Mejor modelo según PyCaret ===")
# print(best_model)
