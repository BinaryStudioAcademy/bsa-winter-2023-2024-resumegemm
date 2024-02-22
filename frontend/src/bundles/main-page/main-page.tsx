import { NavTabs } from '../common/components/components';
import { AppRoute } from '../common/enums/app-route.enum';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const MainPage = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <section className={styles.main__header}>
                    <div className={styles.main__logo}>
                        <img src="/src/assets/img/logo.svg" alt="logo" />
                    </div>
                    <NavTabs items={navbarItems} />
                    <div className={styles.main__avatar}>
                        <img
                            src="/src/assets/img/mock-avatar.png"
                            alt="user-avatar"
                        />
                    </div>
                </section>
            </div>
            <div className={styles.wrapper__line}></div>
        </div>
    );
};

export { MainPage };
