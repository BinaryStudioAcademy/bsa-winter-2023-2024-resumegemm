import styles from './styles.module.scss';

type ExampleBlockProperties = {
    children: React.ReactNode;
};

const ExampleBlock: React.FC<ExampleBlockProperties> = ({ children }) => {
    return <div className={styles.example_block}>{children}</div>;
};

export { ExampleBlock };
