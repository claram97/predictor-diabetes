"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import { formFields, validationSchema, initialValues } from '../app/evaluacion/form.config.js';
import styles from '../app/evaluacion/evaluation.module.css';

// La ruta de tu importación está perfecta si te funciona así.
import { predict } from '../services';

export default function EvaluationForm() {
  const token = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [apiError, setApiError] = useState(null);
  
  // =================================================================
  // CAMBIO 1: El estado 'result' ahora guardará un objeto completo.
  // =================================================================
  const [result, setResult] = useState(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApiError(null);
      setResult(null);

      try {
        const dataToPredict = {
          instances: [values] 
        };
        
        const predictionData = await predict(dataToPredict, token);
        
        // =================================================================
        // CAMBIO 2: Procesamos la nueva respuesta detallada del modelo.
        // =================================================================
        const firstPrediction = predictionData.predictions[0];
        const scores = firstPrediction.scores;
        const classes = firstPrediction.classes;

        // Encontramos el score más alto y su posición
        const maxScore = Math.max(...scores);
        const maxScoreIndex = scores.indexOf(maxScore);
        
        // La clase predicha es la que está en la misma posición que el score más alto
        const predictedClass = classes[maxScoreIndex];

        // Guardamos un objeto con toda la información útil en nuestro estado
        setResult({
          predictedClass: parseInt(predictedClass), // Convertimos el "0" o "1" a número
          confidence: maxScore,
          allScores: scores.map((score, index) => ({
            class: classes[index],
            score: score
          }))
        });

      } catch (err) {
        setApiError(err.message);
      }
    },
  });

  // Pequeña función de ayuda para formatear números a porcentaje
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
                    className={`${styles.input} ${
                      formik.touched[field.name] && formik.errors[field.name] ? styles.inputError : ''
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
          {/* Resultados */}
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
              <div className={styles.resultTitle}>
                {result.predictedClass === 1 ? 'Riesgo Elevado Detectado' : 'Riesgo Bajo Detectado'}
                {/* Añadimos la insignia de confianza */}
                <span className={styles.confidenceBadge}>
                  Confianza: {formatPercent(result.confidence)}
                </span>
              </div>
              <p className={styles.resultText}>
                {result.predictedClass === 1
                  ? 'El modelo de IA estima un riesgo elevado de desarrollar Diabetes Mellitus tipo 2. Se recomienda evaluación clínica adicional.'
                  : 'El modelo de IA estima un riesgo bajo de desarrollar Diabetes Mellitus tipo 2. Continúe con el seguimiento preventivo habitual.'
                }
              </p>
                <div className={styles.scoresBreakdown}>
                <div className={styles.scoreItem}>
                  <span>Prob. Riesgo Bajo (Clase 0):</span>
                  <strong>{formatPercent(result.allScores.find(s => s.class === '0').score)}</strong>
                </div>
                <div className={styles.scoreItem}>
                  <span>Prob. Riesgo Alto (Clase 1):</span>
                  <strong>{formatPercent(result.allScores.find(s => s.class === '1').score)}</strong>
                </div>
              </div>

              <div className={styles.resultActions}>
                <button className={styles.actionButton} onClick={() => window.print()}>
                  📄 Imprimir Reporte
                </button>
                {/* Corregimos el botón para que también limpie el formulario */}
                <button className={styles.actionButton} onClick={() => {formik.resetForm(); setResult(null)}}>
                  🔄 Nueva Evaluación
                </button>
              </div>
              <div className={styles.resultDisclaimer}>
                <strong>Importante:</strong> Esta evaluación es una herramienta de apoyo diagnóstico. 
                No reemplaza el criterio clínico profesional ni el diagnóstico médico integral.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
