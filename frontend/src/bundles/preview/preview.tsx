import { Checkbox, RadioButton, Switch } from '../common/components/components';
import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    return (
        <div className={styles.preview}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <div className={styles.example}>Component preview</div>
                </li>
                <li className={styles.item}>
                    <Checkbox label="Checkbox" />
                    <RadioButton label="Radio button" />
                    <Switch label="Switch" />
                </li>
            </ul>
        </div>
    );
};

export { PreviewPage };
