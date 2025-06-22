import styles from '../app/page.module.css';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureText}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}