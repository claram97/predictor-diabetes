# Cómo correr el proyecto

## Crear el entorno virtual (solo una vez)
```python3 -m venv .venv```

## Activar el entorno (cada vez que abras una terminal nueva)
```source .venv/bin/activate```

## Instalar dependencias (solo una vez)
```pip install -r requirements.txt```

# Entrenamiento del modelo y ejecución del backend

## 1. Entrenar el modelo

Navegar a la carpeta de entrenamiento:
```bash
cd model_training
```

### Comparación de modelos (opcional)
Si quieres ver una comparación entre diferentes algoritmos de machine learning:
```bash
python3 compare_models.py
```
> ⚠️ **Nota**: Este comando tarda varios minutos en ejecutarse. Es completamente opcional.

### Entrenar el modelo principal
```bash
python3 train_diabetes_predictor.py
```
Este script:
- Genera el modelo entrenado
- Crea el scaler para normalización
- Produce gráficos del análisis exploratorio de datos

## 2. Levantar el backend

Salir de la carpeta de entrenamiento y navegar al backend:
```bash
cd ../backend
```

Iniciar el servidor:
```bash
uvicorn predict_diabetes_api:app --reload
```

El servidor estará disponible en `http://127.0.0.1:8000`

## 3. Probar la API

Una vez que el backend esté corriendo, puedes hacer una predicción:

```bash
curl -X POST "http://127.0.0.1:8000/predict/logistic_regression" \
-H "Content-Type: application/json" \
-d '{
  "Pregnancies": 2,
  "Glucose": 130,
  "Insulin": 85,
  "BMI": 28.5,
  "DiabetesPedigreeFunction": 0.5,
  "Age": 45
}'
```

### Parámetros de entrada
- **Pregnancies**: Número de embarazos
- **Glucose**: Nivel de glucosa
- **Insulin**: Nivel de insulina
- **BMI**: Índice de masa corporal
- **DiabetesPedigreeFunction**: Función de pedigrí de diabetes
- **Age**: Edad

La respuesta incluirá la predicción de probabilidad de diabetes.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.