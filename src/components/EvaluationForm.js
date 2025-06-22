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
        const dataToPredict = {
          instances: [values] 
        };
        
        const predictionData = await predict(dataToPredict);
        
        setResult(predictionData.predictions[0].value); 

      } catch (err) {
        setApiError(err.message);
      }
    },
  });

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
            <div className={`${styles.resultCard} ${result === 1 ? styles.riesgoAlto : styles.riesgoBajo}`}>
              <div className={styles.resultIcon}>
                {result === 1 ? '⚠️' : '✅'}
              </div>
              <div className={styles.resultContent}>
                <div className={styles.resultTitle}>
                  {result === 1 ? 'Riesgo Elevado Detectado' : 'Riesgo Bajo Detectado'}
                </div>
                <p className={styles.resultText}>
                  {result === 1
                    ? 'El modelo de IA estima un riesgo elevado de desarrollar Diabetes Mellitus tipo 2. Se recomienda evaluación clínica adicional.'
                    : 'El modelo de IA estima un riesgo bajo de desarrollar Diabetes Mellitus tipo 2. Continúe con el seguimiento preventivo habitual.'
                  }
                </p>
                <div className={styles.resultActions}>
                  <button className={styles.actionButton} onClick={() => window.print()}>
                    📄 Imprimir Reporte
                  </button>
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