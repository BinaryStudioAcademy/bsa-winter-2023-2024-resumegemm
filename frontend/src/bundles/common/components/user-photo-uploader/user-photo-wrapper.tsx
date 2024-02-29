import React from 'react';

import { useAppDispatch } from '~/bundles/common/hooks/hooks.js';
import { updateUserAvatar } from '~/bundles/profile/store/actions';

import { useCallback, useState } from '../../hooks/hooks';
import styles from './styles.module.scss';
import { UserPhotoMockup } from './user-photo-mockup';
import { PhotoUploaderModal } from './user-photo-modal';
import { UserPhotoPreview } from './user-photo-preview';

const UserPhotoWrapper: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState('');

    // need future redux integration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentImage, setCurrentImage] = useState<{
        src: string;
        blob: Blob;
    } | null>(null);

    const dispatch = useAppDispatch();

    // need future redux integration
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onHandleImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const reader = new FileReader();
            const [newImage] = event.target.files ?? [];

            reader.addEventListener('load', () => {
                setCurrentImage({
                    src: reader.result as string,
                    blob: newImage,
                });
            });
            reader.readAsDataURL(newImage);
            const formData = new FormData();
            formData.append('file', newImage);
            void dispatch(updateUserAvatar(formData));
        },
        [setCurrentImage, dispatch],
    );

    return (
        <section className={styles.uploader_wrapper__section}>
            {!currentPhoto && (
                <UserPhotoMockup onClickUpload={setIsModalOpen} />
            )}
            {isModalOpen && (
                <PhotoUploaderModal
                    onToggleModal={setIsModalOpen}
                    onHandleCurrentPhoto={setCurrentPhoto}
                />
            )}
            {currentPhoto && (
                <UserPhotoPreview
                    currentPhoto={currentPhoto}
                    onToggleModal={setIsModalOpen}
                    onHandleCurrentPhoto={setCurrentPhoto}
                />
            )}
        </section>
    );
};

export { UserPhotoWrapper };
