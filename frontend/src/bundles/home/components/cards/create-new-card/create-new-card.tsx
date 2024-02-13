import icon from '~/assets/img/plusCircleIcon.svg';

import styles from './styles.module.scss';

const CreateNewCard: React.FC = () => {
    return (
        <div className={styles.create_new_card}>
            <img src={icon} alt="Create new" />
            <span>Create new</span>
        </div>
    );
};

export { CreateNewCard };
