import imageForModal from '~/assets/img/modal/download-modal.svg';
import { RegularButton } from '~/bundles/common/components/components';
import { Modal } from '~/bundles/common/components/modal/modal';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ModalVariant,
} from '~/bundles/common/enums/enums';
import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isOpen: boolean;
    onClose: () => void;
};

const DownloadResumeLimitModal: React.FC<Properties> = ({
    isOpen,
    onClose,
}) => {
    const navigate = useNavigate();

    const handleClickUpgrade = useCallback((): void => {
        navigate('/settings/subscription');
    }, [navigate]);

    return (
        <Modal
            title="You are over the PDF download limit"
            variant={ModalVariant.FORM}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.modal__content_wrapper}>
                <div className={styles.modal__content_image}>
                    <img src={imageForModal} alt="Resume" />
                </div>
                <div>
                    <p className={styles.modal__description}>
                        Only one PDF download is available with the free plan.
                        Upgrade your plan to download an unlimited number of
                        resumes in PDF format.
                    </p>
                    <p>Also unlock:</p>
                    <ul className={styles.modal__custom_list}>
                        <li>unlimited number of resume creation</li>
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

export { DownloadResumeLimitModal };
