import styles from './LoadingAnimation.module.css';

const LoadingAnimation = ({ t }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>
        {t.loading || 'Carregando...'}
      </p>
    </div>
  );
};

export default LoadingAnimation;
