
import { PlusCircleIcon } from '../../icons/plus-circle-icon';
import styles from './styles.module.scss';

const CreateNewCard: React.FC = () => {
    return (
        <div className={styles.create_new_card}>
            <PlusCircleIcon />
            <span>Create new</span>
        </div>
    );
};

export { CreateNewCard };
