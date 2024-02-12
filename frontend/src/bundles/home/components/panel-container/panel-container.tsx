import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    classname?: string;
};

const PanelContainer: React.FC<Properties> = ({
    children,
    name,
    classname,
}: Properties) => {
    return (
        <div className={`${styles.panelContainer} ${classname ?? ''}`}>
            <div className={styles.panelContainer__topBar}>{name}</div>
            <div className={styles.panelContainer__content}>{children}</div>
        </div>
    );
};

export { PanelContainer };
