import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    return (
        <div className={styles.preview}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <div className={styles.example}>Component preview</div>
                </li>
            </ul>
        </div>
    );
};

export { PreviewPage };
