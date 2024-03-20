import React from 'react';

import {
    deleteUserAvatar,
    updateUserAvatar,
} from '~/bundles/profile/store/actions';
import { actions as resumeActions } from '~/bundles/resume/store/resume.store';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '../../hooks/hooks';
import styles from './styles.module.scss';
import { type ImageBlob } from './types/image-blob.type';
import { UserPhotoMockup } from './user-photo-mockup';
import { PhotoUploaderModal } from './user-photo-modal';
import { UserPhotoPreview } from './user-photo-preview';

type UserPhotoWrapperPayload = {
    isResumeEditorAction?: boolean;
};

const UserPhotoWrapper: React.FC<UserPhotoWrapperPayload> = ({
    isResumeEditorAction,
}) => {
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

                void dispatch(updateUserAvatar(formData))
                    .unwrap()
                    .then((payload) => {
                        if (isResumeEditorAction) {
                            void dispatch(
                                resumeActions.setUserAvatarInTemplateSettings(
                                    payload.avatar,
                                ),
                            );
                        }
                    });
            }
        },
        [isResumeEditorAction, dispatch],
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
                    isResumeEditorAction={isResumeEditorAction}
                    onToggleModal={setIsModalOpen}
                    onHandleCurrentPhoto={onHandlePhoto}
                />
            )}
        </section>
    );
};

export { UserPhotoWrapper };
