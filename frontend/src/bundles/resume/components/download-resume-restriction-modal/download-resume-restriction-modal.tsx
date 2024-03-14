import resume from '~/assets/img/resume.svg';
import { Icon, RegularButton } from '~/bundles/common/components/components';
import { Modal } from '~/bundles/common/components/modal/modal';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    IconName,
    ModalVariant,
} from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

const DownloadResumeRestrictionModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback((): void => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback((): void => {
        setIsOpen(false);
    }, []);

    return (
        <div>
            <RegularButton
                variant={ButtonVariant.GHOST}
                size={ButtonSize.MEDIUM}
                type={ButtonType.BUTTON}
                onClick={handleOpen}
            >
                Open Modal
            </RegularButton>
            <Modal
                title="Upgrade to unlock Microsoft Word export"
                variant={ModalVariant.FORM}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <div className={styles.modal__content_wrapper}>
                    <Icon
                        name={IconName.CLOSE_CROSS}
                        color="grey"
                        className={styles.modal__icon_close}
                    />
                    <div className={styles.modal__content_image}>
                        <img src={resume} alt="Resume" />
                    </div>
                    <div>
                        <p className={styles.modal__description}>
                            Only subscribed users can download their resume in
                            pdf. Please upgrade your plan to unlock pdf export.
                        </p>
                        <p>Also unlock:</p>
                        <ul className={styles.modal__custom_list}>
                            <li>unlimit number of resume creation</li>
                            <li>other features</li>
                        </ul>
                        <div className={styles.modal__buttons}>
                            <RegularButton
                                className={styles.modal__upgrade_button}
                                variant={ButtonVariant.GHOST}
                                size={ButtonSize.MEDIUM}
                                type={ButtonType.BUTTON}
                                onClick={handleClose}
                            >
                                Upgrade now
                            </RegularButton>

                            <RegularButton
                                className={styles.modal__skip_button}
                                variant={ButtonVariant.GHOST}
                                size={ButtonSize.MEDIUM}
                                type={ButtonType.BUTTON}
                                onClick={handleClose}
                            >
                                Skip
                            </RegularButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { DownloadResumeRestrictionModal };
