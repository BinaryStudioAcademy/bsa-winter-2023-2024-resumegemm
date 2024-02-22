import styles from './styles.module.scss';

const MainPage = (): JSX.Element => {
    return (
        <div className={styles.main}>
            <div className={styles.main__header}>
                <div className={styles.main__logo}></div>
                <div className={styles.main__tabs}></div>
                <div className={styles.main__avatar}></div>
            </div>
        </div>
    );
};

export { MainPage };
