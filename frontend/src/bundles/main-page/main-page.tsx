import { NavTabs } from '../common/components/components';
import { AppRoute } from '../common/enums/app-route.enum';
import { Home } from '../home/pages/home';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.HOME },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const MainPage = (): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.header}>
                <div className={styles.header__logo}>
                    <img src="/src/assets/img/logo.svg" alt="logo" />
                </div>
                <NavTabs items={navbarItems} />
                <div className={styles.header__avatar}>
                    <img
                        src="/src/assets/img/mock-avatar.png"
                        alt="user-avatar"
                    />
                </div>
            </section>
            <div className={styles.wrapper__line}></div>
            <Home />
        </div>
    );
};

export { MainPage };
