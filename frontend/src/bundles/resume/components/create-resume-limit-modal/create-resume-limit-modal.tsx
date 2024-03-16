import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import resume from '~/assets/img/resume.svg';
import { RegularButton } from '~/bundles/common/components/components';
import { Modal } from '~/bundles/common/components/modal/modal';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ModalVariant,
} from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type CreateResumeLimitModalProperties = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateResumeLimitModal: React.FC<CreateResumeLimitModalProperties> = ({
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();

    const handleClickUpgrade = useCallback((): void => {
        navigate('/settings/subscription');
    }, [navigate]);

    return (
        <Modal
            title="You have reached the resume limit"
            variant={ModalVariant.FORM}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.modal__content_wrapper}>
                <div className={styles.modal__content_image}>
                    <img src={resume} alt="Resume" />
                </div>
                <div>
                    <p className={styles.modal__description}>
                        You have reached the limit of resumes you can create.
                        Please upgrade your plan to create more resumes.
                    </p>
                    <p>Also unlock:</p>
                    <ul className={styles.modal__custom_list}>
                        <li>download resume in pdf format</li>
                        <li>other features</li>
                    </ul>
                    <div className={styles.modal__buttons}>
                        <RegularButton
                            className={styles.modal__upgrade_button}
                            variant={ButtonVariant.GHOST}
                            size={ButtonSize.MEDIUM}
                            type={ButtonType.BUTTON}
                            onClick={handleClickUpgrade}
                        >
                            Upgrade now
                        </RegularButton>

                        <RegularButton
                            className={styles.modal__skip_button}
                            variant={ButtonVariant.GHOST}
                            size={ButtonSize.MEDIUM}
                            type={ButtonType.BUTTON}
                            onClick={onClose}
                        >
                            Skip
                        </RegularButton>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export { CreateResumeLimitModal };
