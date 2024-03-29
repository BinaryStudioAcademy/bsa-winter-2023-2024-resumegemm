import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { actions } from '~/bundles/auth/store/slice';
import { Modal, RegularButton } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    ModalVariant,
} from '~/bundles/common/enums/enums';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { actions as userActions } from '../../store/user.store';
import styles from './style.module.scss';

const DeleteAccount: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleDeleteAccount = useCallback(() => {
        void dispatch(userActions.deleteProfile());
        dispatch(actions.setUser(null));
        setIsModalOpen(false);
        navigate(AppRoute.SIGN_UP);
    }, [dispatch, navigate]);

    return (
        <div className={styles.profile__delete}>
            <p>
                Once you delete your account, it cannot be undone. This is
                permanent.
            </p>
            <RegularButton
                variant={ButtonVariant.PRIMARY}
                onClick={handleOpenModal}
            >
                Delete
            </RegularButton>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Delete profile"
                variant={ModalVariant.CONFIRM}
            >
                <div className={styles.profile__delete__actions}>
                    <div className={styles.modal_content}>
                        <p>
                            Are you sure you want to delete your account? Once
                            deleted account cannot be restored.
                        </p>
                        <div className={styles.modal_buttons}>
                            <RegularButton
                                className={styles.modal__cancel__button}
                                variant={ButtonVariant.GHOST}
                                size={ButtonSize.MEDIUM}
                                type={ButtonType.BUTTON}
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </RegularButton>

                            <RegularButton
                                className={styles.modal__delete__button}
                                variant={ButtonVariant.GHOST}
                                size={ButtonSize.MEDIUM}
                                type={ButtonType.BUTTON}
                                onClick={handleDeleteAccount}
                            >
                                Delete
                            </RegularButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export { DeleteAccount };
