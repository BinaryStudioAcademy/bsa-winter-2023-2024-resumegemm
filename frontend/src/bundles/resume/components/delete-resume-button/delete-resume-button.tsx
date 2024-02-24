import { useCallback, useState } from 'react';

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
            <button onClick={handleShowModal} className={styles.delete__button}>
                <div className={styles.delete__button__icon}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8,19 L16,19 L16,13 L8,13 L8,19 Z M16,7 L20,7 L20,9 L4,9 L4,7 L8,7
                            L8,3 L16,3 L16,7 Z M14,7 L14,5 L10,5 L10,7 L14,7 Z M6,11 L18,11 L18,21
                            L6,21 L6,11 Z"
                            fill="rgb(26, 145, 240)"
                            fillRule="nonzero"
                        ></path>
                    </svg>
                </div>
                <span className={styles.delete__button__text}>Delete</span>
            </button>
            {isModalShown && <DeleteResumeModal onClose={handleCloseModal} />}
        </div>
    );
};

export { DeleteResumeButton };
