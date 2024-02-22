import { forwardRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

type Properties = {
    onLogout: () => void;
};

const Menu = forwardRef<HTMLMenuElement, Properties>(function Menu(
    { onLogout },
    menuReference,
) {
    const navigate = useNavigate();

    const logoutHandler = useCallback(() => {
        onLogout();
        navigate('/');
    }, [navigate, onLogout]);

    return (
        <menu ref={menuReference} className={styles.menu}>
            <Link className={styles.menu__link} to={'/account-settings'}>
                Account Settings
            </Link>
            <button className={styles.menu__link} onClick={logoutHandler}>
                Log Out
            </button>
        </menu>
    );
});

export { Menu };
