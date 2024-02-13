import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    return (
        <div className={styles.preview}>
            <div className={styles.example}>Component preview</div>
        </div>
    );
};

export { PreviewPage };
