import styles from '../app/page.module.css';

export default function StatsSection() {
  return (
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
        <div className={styles.statNumber}>6</div>
        <div className={styles.statLabel}>Parámetros Clínicos</div>
      </div>
    </div>
  );
}