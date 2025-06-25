"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import { formFields, validationSchema, initialValues } from '../app/evaluacion/form.config.js';
import styles from '../app/evaluacion/evaluation.module.css';

import { predict } from '../services';

export default function EvaluationForm() {
  const [apiError, setApiError] = useState(null);
  const [result, setResult] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApiError(null);
      setResult(null);

      try {
        // Obtenemos los valores directamente. Formik ya los maneja como números.
        const dataToPredict = {
          Pregnancies: values.Pregnancies,
          Glucose: values.Glucose,
          Insulin: values.Insulin,
          BMI: values.BMI,
          DiabetesPedigreeFunction: values.DiabetesPedigreeFunction,
          Age: values.Age
        };

        console.log("Enviando estos datos a la API:", dataToPredict);

        const predictionData = await predict(dataToPredict);
        
        const prediction = predictionData.prediction;
        const probability = predictionData.probability;

        const confidence = prediction === 1 ? probability : 1 - probability;
        
        const scores = [1 - probability, probability];

        setResult({
          predictedClass: prediction,
          confidence: confidence,
          allScores: [
              { class: '0', score: scores[0] },
              { class: '1', score: scores[1] }
          ]
        });

      } catch (err) {
        setApiError(err.message);
      }
    },
  });

  const formatPercent = (n) => `${(n * 100).toFixed(1)}%`;

  return (
    <div className={styles.mainContent}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <div className={styles.stepIndicator}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Parámetros Clínicos</div>
              <div className={styles.stepDescription}>Ingrese los valores de laboratorio y mediciones</div>
            </div>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.fieldsGrid}>
            {formFields.map((field, index) => (
              <div key={field.name} className={styles.field} style={{ animationDelay: `${index * 0.1}s` }}>
                <label htmlFor={field.name} className={styles.label}>
                  {field.label}
                  <span className={styles.labelUnit}>{field.unit || ''}</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    step={field.step}
                    className={`${styles.input} ${formik.touched[field.name] && formik.errors[field.name] ? styles.inputError : ''
                      } ${formik.touched[field.name] && !formik.errors[field.name] ? styles.inputSuccess : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field.name]}
                    placeholder={field.placeholder || '0'}
                  />
                  <div className={styles.inputIcon}>
                    {field.icon || '📊'}
                  </div>
                </div>
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <div className={styles.errorText}>
                    <span className={styles.errorIcon}>⚠️</span>
                    {formik.errors[field.name]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.submitSection}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              <span className={styles.buttonText}>
                {formik.isSubmitting ? 'Procesando Datos...' : 'Generar Evaluación Predictiva'}
              </span>
              <div className={styles.buttonIcon}>
                {formik.isSubmitting ? '⏳' : '🔬'}
              </div>
              {formik.isSubmitting && <div className={styles.loadingSpinner}></div>}
            </button>
          </div>
        </form>
        {apiError && (
          <div className={`${styles.resultCard} ${styles.errorCard}`}>
            <div className={styles.resultIcon}>❌</div>
            <div className={styles.resultContent}>
              <div className={styles.resultTitle}>Error en el Procesamiento</div>
              <p className={styles.resultText}>{apiError}</p>
            </div>
          </div>
        )}

        {result !== null && (
          <div className={`${styles.resultCard} ${result.predictedClass === 1 ? styles.riesgoAlto : styles.riesgoBajo}`}>
            <div className={styles.resultIcon}>
              {result.predictedClass === 1 ? '⚠️' : '✅'}
            </div>
            <div className={styles.resultContent}>

              {/* Título Principal */}
              <h3 className={styles.resultTitle}>
                Clasificación de Riesgo: {result.predictedClass === 1 ? 'ALTO' : 'Bajo'}
              </h3>

              {/* Desglose de Probabilidades */}
              <div className={styles.scoresBreakdown}>
                <div className={styles.scoreItem}>
                  <span>Probabilidad de Escenario de Riesgo Bajo:</span>
                  <strong>{formatPercent(result.allScores.find(s => s.class === '0').score)}</strong>
                </div>
                <div className={styles.scoreItem}>
                  <span>Probabilidad de Escenario de Riesgo Alto:</span>
                  <strong>{formatPercent(result.allScores.find(s => s.class === '1').score)}</strong>
                </div>
              </div>
              
              {/* Interpretación Sugerida */}
              <div className={styles.resultText}>
                <h4>Interpretación Sugerida:</h4>
                <p>
                  {result.predictedClass === 1
                    ? 'El modelo clasifica al paciente en la categoría de riesgo alto para el desarrollo de Diabetes Mellitus tipo 2. Este resultado sugiere una probabilidad elevada basada en los parámetros clínicos ingresados. Se recomienda considerar una evaluación clínica detallada y estudios complementarios.'
                    : 'El modelo clasifica al paciente en la categoría de riesgo bajo para el desarrollo de Diabetes Mellitus tipo 2, basado en los datos proporcionados. Se sugiere mantener el seguimiento clínico preventivo estándar, según el criterio profesional.'
                  }
                </p>
              </div>

              {/* Botones de Acción (sin cambios) */}
              <div className={styles.resultActions}>
                <button className={styles.actionButton} onClick={() => window.print()}>
                  📄 Imprimir Reporte
                </button>
                <button className={styles.actionButton} onClick={() => { formik.resetForm(); setResult(null) }}>
                  🔄 Nueva Evaluación
                </button>
              </div>

              {/* Disclaimer (sin cambios) */}
              <div className={styles.resultDisclaimer}>
                <strong>Importante:</strong> Esta es una herramienta de soporte para la estratificación de riesgo. No reemplaza el criterio clínico profesional.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}