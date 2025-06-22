import styles from './page.module.css';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <StatsSection />
    </main>
  );
}