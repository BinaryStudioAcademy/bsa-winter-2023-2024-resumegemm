import styles from './styles.module.scss';

const MainPage = (): JSX.Element => {
    return (
        <div className={styles.main}>
            <section className={styles.main__header}>
                <div className={styles.main__logo}>
                    <img src="/src/assets/img/logo.svg" alt="logo" />
                </div>
                <div className={styles.main__tabs}></div>
                <div className={styles.main__avatar}>
                    <img
                        src="/src/assets/img/mock-avatar.png"
                        alt="user-avatar"
                    />
                </div>
            </section>
        </div>
    );
};

export { MainPage };
