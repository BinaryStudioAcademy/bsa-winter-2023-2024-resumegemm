import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
};

const HomeTopSection: React.FC<Properties> = ({ children }: Properties) => {
    return <div className={styles.home_top_section}>{children}</div>;
};

export { HomeTopSection };
