import Link from 'next/link';
import EvaluationForm from '../../components/EvaluationForm'; // Importamos el formulario
import styles from './evaluation.module.css'; // Usará los mismos estilos que tu formulario

export default function EvaluationPage() {
  return (
    <div className={styles.pageContainer}>
      
      <Link href="/" className={styles.backButton}>
        <span>&larr;</span> Volver
      </Link>
      
      <EvaluationForm />

    </div>
  );
}