import { type ReactNode } from 'react';

import styles from './style.module.scss';

type Properties = {
    title: string,
    children: ReactNode,
};

const ProfileCard: React.FC<Properties> = ({ title, children }) => {
    return (
        <div className={styles.profile__content}>
            <div className={styles.profile__card__title}>
                <span>{title}</span>
            </div>
            <div className={styles.profile__card}>
                <div className={styles.profile__card__content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { ProfileCard };
