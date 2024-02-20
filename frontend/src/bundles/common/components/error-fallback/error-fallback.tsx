import styles from './styles.module.scss';

const ErrorFallback: React.FC = () => {
    return <div className={styles.error_fallback}>Something went wrong :(</div>;
};

export { ErrorFallback };
