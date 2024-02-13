import { useCallback, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    const [showLinks, setShowLinks] = useState(false);

    const handleShowLinks = useCallback(() => {
        setShowLinks(!showLinks);
    }, [showLinks]);

    return (
        <div className={styles.preview}>
            {showLinks && (
                <ul className={styles.preview__link_list}>
                    <NavLink to="#">Link example</NavLink>
                </ul>
            )}
            <button
                className={styles.preview__button}
                onClick={handleShowLinks}
            >
                Links
            </button>
            <Outlet />
        </div>
    );
};

export { PreviewPage };
