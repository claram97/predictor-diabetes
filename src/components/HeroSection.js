"use client";

import Link from 'next/link';
import styles from '../app/page.module.css';
import FeatureCard from './FeatureCard';

export default function HeroSection() {

  return (
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
          <FeatureCard 
            icon="🔬" 
            title="Modelo Validado" 
            description="Entrenado con el dataset PIMA Indians Diabetes Database (NIDDK)" 
          />
          <FeatureCard 
            icon="⚡" 
            title="Evaluación Rápida" 
            description="Análisis de parámetros clínicos en tiempo real" 
          />
          <FeatureCard 
            icon="🎯" 
            title="Estratificación Precisa" 
            description="Clasificación de riesgo basada en evidencia científica" 
          />
        </div>
        
        <Link href="/evaluacion" className={styles.ctaButton}>
          <span>Iniciar Evaluación Clínica</span>
          <div className={styles.buttonIcon}>→</div>
        </Link>
        
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
  );
}