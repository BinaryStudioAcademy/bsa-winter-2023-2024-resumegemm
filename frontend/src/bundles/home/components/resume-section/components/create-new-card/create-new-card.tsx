import icon from '~/assets/img/plusCircleIcon.svg';

import styles from './styles.module.scss';

const CreateNewCard: React.FC = () => {
    return (
        <div className={styles.createNewCard}>
            <img
                src={icon}
                alt="Create new"
                className={styles.createNewCard__icon}
            />
            <span className={styles.createNewCard__text}>Create new</span>
        </div>
    );
};

export { CreateNewCard };
