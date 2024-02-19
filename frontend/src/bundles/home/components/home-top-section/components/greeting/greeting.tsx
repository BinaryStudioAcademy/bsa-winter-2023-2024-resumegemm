import styles from './styles.module.scss';

const Greeting: React.FC = () => {
    return (
        <div className={styles.greeting}>
            <h2 className={styles.greeting__title}>Welcome!</h2>
            <p className={styles.greeting__text}>
                Jone, you’re on your way to landing your dream job
            </p>
        </div>
    );
};

export { Greeting };
