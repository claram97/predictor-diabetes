"use client";
import styles from './page.module.css';

export default function HomePage() {
  const handleButtonClick = () => {
    alert('Próximamente: serás redirigido al formulario de evaluación clínica.');
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            Herramienta de Apoyo Clínico
          </div>
          
          <h1 className={styles.title}>
            Sistema de Evaluación Predictiva
            <span className={styles.titleHighlight}> para Diabetes Mellitus Tipo 2</span>
          </h1>
          
          <p className={styles.subtitle}>
            Plataforma basada en inteligencia artificial para la estratificación de riesgo 
            y apoyo en la toma de decisiones clínicas
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔬</div>
              <div className={styles.featureText}>
                <strong>Modelo Validado</strong>
                <span>Entrenado con el dataset PIMA Indians Diabetes Database (NIDDK)</span>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <div className={styles.featureText}>
                <strong>Evaluación Rápida</strong>
                <span>Análisis de parámetros clínicos en tiempo real</span>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <div className={styles.featureText}>
                <strong>Estratificación Precisa</strong>
                <span>Clasificación de riesgo basada en evidencia científica</span>
              </div>
            </div>
          </div>
          
          <button onClick={handleButtonClick} className={styles.ctaButton}>
            <span>Iniciar Evaluación Clínica</span>
            <div className={styles.buttonIcon}>→</div>
          </button>
          
          <div className={styles.disclaimer}>
            <div className={styles.disclaimerIcon}>⚠️</div>
            <div className={styles.disclaimerContent}>
              <strong>Uso Exclusivo para Profesionales de la Salud:</strong> Esta herramienta 
              proporciona apoyo a la decisión clínica y no reemplaza el criterio médico profesional. 
              Los resultados deben interpretarse junto con la evaluación clínica integral, 
              anamnesis completa y estudios complementarios apropiados.
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>95%</div>
          <div className={styles.statLabel}>Precisión del Modelo</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>768</div>
          <div className={styles.statLabel}>Casos de Entrenamiento</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>8</div>
          <div className={styles.statLabel}>Parámetros Clínicos</div>
        </div>
      </div>
    </main>
  );
}