import pandas as pd
from pycaret.classification import *

# 1. Cargar CSV (ajustá la ruta a la de tu archivo)
df = pd.read_csv('diabetes.csv')
print("Columnas originales:")
print(df.columns.tolist())

# 2. Renombrar columnas para que tengan nombres simples y sin espacios
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
best_model = compare_models(sort='Recall')

print("Best model is:")
print(best_model)

# 5. Entrenar el mejor modelo con todos los datos
final_model = finalize_model(best_model)

print("Final model is:")
print(final_model)


# 6. Guardar el modelo para usar después
save_model(final_model, 'modelo_diabetes_pycaret')

print("Modelo entrenado y guardado como 'modelo_diabetes_pycaret.pkl'")
