import styles from './styles.module.scss';

type BadgeProperties = {
    title: string;
    className?: string;
};

const Badge: React.FC<BadgeProperties> = ({ title, className }) => (
    <div className={`${styles.badge} ${className}`}>{title}</div>
);

export { Badge };
