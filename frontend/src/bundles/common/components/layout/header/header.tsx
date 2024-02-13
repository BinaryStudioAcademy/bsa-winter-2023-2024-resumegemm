import { Link } from 'react-router-dom';

import logo from '~/assets/img/logo.svg';

import { Tab } from '../../tabs/tab';
import { TabItem } from '../../tabs/tab-item';
import styles from './styles.module.scss';
import { UserProfile } from './user-profile/user-profile';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">
                <img className={styles.logo__icon} src={logo} alt="Logo icon" />
                <span className={styles.logo__text}>Logo</span>
            </Link>
            <Tab>
                <TabItem title="Home">{''}</TabItem>
                <TabItem title="Templates">{''}</TabItem>
            </Tab>
            <UserProfile src="" />
        </header>
    );
};

export { Header };
