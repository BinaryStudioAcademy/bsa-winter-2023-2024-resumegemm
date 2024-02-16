import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    className?: string;
};

const Badge: React.FC<Properties> = ({ title, className = '' }) => (
    <div className={clsx(styles.badge, className)}>{title}</div>
);

export { Badge };
