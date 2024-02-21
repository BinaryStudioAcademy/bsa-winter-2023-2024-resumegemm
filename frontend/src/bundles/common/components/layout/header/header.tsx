import { Link } from 'react-router-dom';

import logo from '~/assets/img/logo.svg';

import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
};

const Header: React.FC<Properties> = ({ children }) => {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">
                <img className={styles.logo__icon} src={logo} alt="Logo icon" />
            </Link>
            {children}
        </header>
    );
};

export { Header };
