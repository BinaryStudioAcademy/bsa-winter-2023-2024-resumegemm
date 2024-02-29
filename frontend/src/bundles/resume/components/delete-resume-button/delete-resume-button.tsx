import { useCallback, useState } from 'react';

import { BaseButton, CustomIcon } from '~/bundles/common/components/components';

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
        <div>
            <BaseButton
                onClick={handleShowModal}
                className={styles.delete__button}
            >
                <CustomIcon
                    size={'24px'}
                    name={'delete'}
                    color={'rgb(26 145 240)'}
                />
                <span className={styles.delete__button__text}>Delete</span>
            </BaseButton>
            {isModalShown && <DeleteResumeModal onClose={handleCloseModal} />}
        </div>
    );
};

export { DeleteResumeButton };
