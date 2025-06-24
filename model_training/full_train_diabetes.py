import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import joblib

# =======================
# 1. Carga de datos
# =======================
df = pd.read_csv('diabetes.csv')
print(f"Columnas ({len(df.columns)}): {df.columns.tolist()}")
print("\nMuestra de los primeros 5 registros:\n", df.head())
print("\nResumen estadístico (resumen):\n", df.describe().T[['mean','std','min','max']])


# =======================
# 2. Análisis Exploratorio
# =======================
# Matriz de correlación
plt.figure(figsize=(8, 6))
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap='coolwarm')
plt.title('Matriz de Correlación')
plt.savefig('correlacion.png')
plt.close()

# Balance de clases
df['Outcome'].value_counts().plot(kind='bar', title='Balance de Clases')
plt.savefig('balance_clases.png')
plt.close()

# =======================
# 3. Preprocesamiento (modificado para descartar variables)
# =======================

# Variables a descartar
# vars_a_descartar = ['BloodPressure', 'SkinThickness'] # Dieron poca correlación

# Quitar esas columnas
# X = df.drop(['Outcome'] + vars_a_descartar, axis=1)
X = df.drop(['Outcome'], axis=1)

y = df['Outcome']

# Escalar
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Dividir en train/test
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# =======================
# 4. Entrenamiento
# =======================
model = LogisticRegression(max_iter=500, class_weight='balanced', random_state=42)
model.fit(X_train, y_train)

# =======================
# 5. Evaluación
# =======================
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print("\nMétricas de evaluación:")
print(classification_report(y_test, y_pred))
print(f"AUC: {roc_auc_score(y_test, y_proba):.3f}")

# Matriz de confusión
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='g', cmap='Blues')
plt.title('Matriz de Confusión')
plt.savefig('matriz_confusion.png')
plt.close()

# =======================
# 6. Importancia de features
# =======================
importances_df = pd.DataFrame({
    'feature': X.columns,
    'importance': model.coef_[0]
}).sort_values('importance', ascending=False)
print("\nImportancia de variables:\n", importances_df)

importances_df.plot(kind='barh', x='feature', y='importance', title='Importancia de Variables')
plt.savefig('importancia_features.png')
plt.close()

# =======================
# 7. Guardar modelo y scaler
# =======================
joblib.dump(model, 'modelo_lr.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("\nModelo y scaler guardados correctamente.")
