import { useCallback, useState } from 'react';

import deleteIcon from '~/assets/img/delete-icon.svg';
import { BaseButton } from '~/bundles/common/components/components';

import { DeleteResumeModal } from '../delete-resume-modal.tsx/delete-resume-modal';
import styles from './styles.module.scss';

const DeleteResumeButton: React.FC = () => {
    const [isModalShown, setIsModalShown] = useState(false);

    const handleShowModal = useCallback(() => {
        setIsModalShown(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalShown(false);
    }, []);

    return (
        <div className={styles.delete__button__wrapper}>
            <BaseButton
                onClick={handleShowModal}
                className={styles.delete__button}
            >
                <img src={deleteIcon} alt="delete icon" />
                <span className={styles.delete__button__text}>Delete</span>
            </BaseButton>
            {isModalShown && <DeleteResumeModal onClose={handleCloseModal} />}
        </div>
    );
};

export { DeleteResumeButton };
