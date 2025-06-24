# Cómo correr el proyecto
En la raíz correr el comando:
`python3.11 -m venv predictor_diabetes`
Está en el gitignore así que no se pushea, cada uno tiene la suya y solo es necesario crearla una vez.
Luego, antes de correr el proyecto, siempre hay que hacer:
`source predictor_diabetes/bin/activate`
Eso hay que correrlo cada vez que se abre una terminal nueva.
Luego, por única vez, se instalan las dependencias:
`pip install numpy pandas scikit-learn fastapi uvicorn joblib seaborn matplotlib fastapi uvicorn pycaret`
Y luego, por única vez, downgradeamos a esta versión de scikit-learn:
`pip install scikit-learn==1.4.2`

A partir de eso:
- Vamos a la carpeta model_training.
- Si les da curiosidad, pueden correr el comando python3 compare_models.py. Tarda un raaaaaaato, e imprime una comparación entre distintos modelos. No es necesario correrlo.
- Correr python3 train_diabetes_predictor.py. Eso genera el modelo y el scaler, y además unas imágenes que son parte del análisis exploratorio de datos.
- Por último salir de la carpeta model_training e ir a la carpeta backend.
- En la carpeta backend corren uvicorn predict_diabetes_api:app --reload. Ese comando levanta el back con el modelo. Si tienen errores preguntenle a ChatGPT.
- Una vez que levantó el back ya se puede hacer curl y responde:
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
Ese endpoint se puede llamar desde el front para predecir :)

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