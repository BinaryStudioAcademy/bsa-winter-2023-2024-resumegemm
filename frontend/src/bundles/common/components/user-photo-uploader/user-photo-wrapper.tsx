import React from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '~/bundles/common/hooks/hooks.js';
import {
    deleteUserAvatar,
    updateUserAvatar,
} from '~/bundles/profile/store/actions';

import { useCallback, useState } from '../../hooks/hooks';
import styles from './styles.module.scss';
import { type ImageBlob } from './types/image-blob.type';
import { UserPhotoMockup } from './user-photo-mockup';
import { PhotoUploaderModal } from './user-photo-modal';
import { UserPhotoPreview } from './user-photo-preview';

const UserPhotoWrapper: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const avatar = useAppSelector(({ auth }) => {
        return auth.user?.userProfile.avatar;
    });

    const dispatch = useAppDispatch();

    const onHandlePhoto = useCallback(
        (payload: ImageBlob | null) => {
            if (payload) {
                const formData = new FormData();
                formData.append('file', payload.blob);

                void dispatch(updateUserAvatar(formData));
            }
        },
        [dispatch],
    );

    const onCurrentPhotoHandler = useCallback(() => {
        void dispatch(deleteUserAvatar());
    }, [dispatch]);

    return (
        <section className={styles.uploader_wrapper__section}>
            {avatar ? (
                <UserPhotoPreview
                    currentPhoto={avatar}
                    onToggleModal={setIsModalOpen}
                    onHandleCurrentPhoto={onCurrentPhotoHandler}
                />
            ) : (
                <UserPhotoMockup onClickUpload={setIsModalOpen} />
            )}
            {isModalOpen && (
                <PhotoUploaderModal
                    onToggleModal={setIsModalOpen}
                    onHandleCurrentPhoto={onHandlePhoto}
                />
            )}
        </section>
    );
};

export { UserPhotoWrapper };
