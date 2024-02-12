import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
};

const HomeTopSection: React.FC<Properties> = ({ children }: Properties) => {
    return <div className={styles.homeTopSection}>{children}</div>;
};

export { HomeTopSection };
