import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { storage, StorageKey } from '~/framework/storage/storage';

import { Menu } from './menu/menu';
import styles from './styles.module.scss';

type Properties = {
    image: string;
    onLogout?: () => void;
};

const UserProfile: React.FC<Properties> = ({ image }) => {
    const navigate = useNavigate();
    const menuReference = useRef<HTMLMenuElement>(null);

    const [active, setActive] = useState(false);

    const handleButtonClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();

            setActive((previousActive) => !previousActive);
        },
        [setActive],
    );

    const handleLogout = useCallback(() => {
        void storage.drop(StorageKey.ACCESS_TOKEN).then(() => {
            navigate(AppRoute.LOG_IN);
        });
    }, [navigate]);

    useEffect(() => {
        const handleOutsideClick = (event_: MouseEvent): void => {
            if (active && event_.target !== menuReference.current) {
                setActive(false);
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [active]);

    return (
        <div className={styles.profile__container}>
            <button
                className={clsx(
                    styles.profile__button,
                    active && styles.active,
                )}
                onClick={handleButtonClick}
            >
                <img
                    className={styles.profile__image}
                    src={image}
                    alt="User profile"
                />
            </button>
            {active && <Menu ref={menuReference} onLogout={handleLogout} />}
        </div>
    );
};

export { UserProfile };
