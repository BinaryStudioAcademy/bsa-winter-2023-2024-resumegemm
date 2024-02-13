import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    return (
        <div className={styles.preview}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <div className={styles.example}>Component preview</div>
                </li>
                <li className={styles.item}>
                    <Home />
                </li>
                <li className={styles.item}>
                    <Templates />
                </li>
            </ul>
        </div>
    );
};

export { PreviewPage };
