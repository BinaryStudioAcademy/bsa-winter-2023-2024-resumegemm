import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Menu } from './menu/menu';
import styles from './styles.module.scss';

type Properties = {
    src: string;
    onLogout?: () => void;
};

const UserProfile: React.FC<Properties> = ({ src }) => {
    const menuReference = useRef<HTMLMenuElement>(null);

    const [active, setActive] = useState(false);

    const buttonClickHandler = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();

            setActive((previousActive) => !previousActive);
        },
        [setActive],
    );

    const logoutHandler = useCallback(() => {
        //TODO: Logout handler
    }, []);

    useEffect(() => {
        const outsideClickHandler = (event_: MouseEvent): void => {
            if (active && event_.target !== menuReference.current) {
                setActive(false);
            }
        };

        document.body.addEventListener('click', outsideClickHandler);

        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        };
    }, [active]);

    return (
        <div className={styles.profile__container}>
            <button
                className={clsx(
                    styles.profile__button,
                    active && styles.active,
                )}
                onClick={buttonClickHandler}
            >
                <img
                    className={styles.profile__image}
                    src={src}
                    alt="User profile"
                />
            </button>
            {active && <Menu ref={menuReference} onLogout={logoutHandler} />}
        </div>
    );
};

export { UserProfile };
