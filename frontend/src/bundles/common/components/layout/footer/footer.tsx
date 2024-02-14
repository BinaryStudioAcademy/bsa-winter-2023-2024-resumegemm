import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
};

const Footer: React.FC<Properties> = ({ children }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__controls}>{children}</div>
        </footer>
    );
};

export { Footer };
