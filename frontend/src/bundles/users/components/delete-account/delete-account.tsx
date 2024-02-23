import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BaseButton, Modal } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonVariant,
    ModalVariant,
} from '~/bundles/common/enums/enums';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { actions as userActions } from '../../store/';
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
        setIsModalOpen(false);
        navigate(AppRoute.SIGN_IN);
    }, [dispatch, navigate]);

    return (
        <div className={styles.profile__delete}>
            <p>
                Once you delete your account, it cannot be undone. This is
                permanent.
            </p>
            <BaseButton
                variant={ButtonVariant.PRIMARY}
                onClick={handleOpenModal}
            >
                Delete
            </BaseButton>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Delete profile"
                variant={ModalVariant.CONFIRM}
            >
                <div className={styles.profile__delete__actions}>
                    <p>Are you sure you want delete your profile?</p>
                    <BaseButton
                        variant={ButtonVariant.PRIMARY}
                        onClick={handleDeleteAccount}
                    >
                        Delete
                    </BaseButton>
                </div>
            </Modal>
        </div>
    );
};

export { DeleteAccount };
