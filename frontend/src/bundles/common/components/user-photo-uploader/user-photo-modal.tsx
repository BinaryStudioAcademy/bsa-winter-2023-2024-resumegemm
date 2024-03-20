import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import { IconName } from '../../enums/enums';
import { Icon, IconButton } from '../components';
import styles from './styles.module.scss';
import { type ImageBlob } from './types/image-blob.type';
import { UserPhotoCropper } from './user-photo-cropper';
import { UserPhotoUploader } from './user-photo-uploader';

interface UploadModalProperties {
    onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    isResumeEditorAction?: boolean;
    onHandleCurrentPhoto: (
        payload: {
            src: string | ArrayBuffer | null;
            blob: Blob;
        } | null,
    ) => void;
}

const PhotoUploaderModal: React.FC<UploadModalProperties> = ({
    onToggleModal,
    onHandleCurrentPhoto,
    isResumeEditorAction,
}) => {
    const [image, setImage] = useState<ImageBlob | null>(null);

    const onCompleteHandler = useCallback(() => {
        onHandleCurrentPhoto(image);

        onToggleModal(false);
    }, [onToggleModal, onHandleCurrentPhoto, image]);

    const handleClose = useCallback(() => {
        onToggleModal(false);
    }, [onToggleModal]);

    return (
        <div
            className={clsx(
                styles.uploader_modal__backdrop,
                isResumeEditorAction && styles.uploader_modal__backdrop__hidden,
            )}
        >
            <div
                className={clsx(
                    styles.uploader_modal__overlay,
                    isResumeEditorAction &&
                        styles.uploader_modal__overlay__small,
                )}
            >
                <IconButton
                    onClick={handleClose}
                    className={styles.uploader_modal__button__close}
                >
                    <Icon name={IconName.CLOSE_CROSS} />
                </IconButton>
                {!image && <UserPhotoUploader onImageUpload={setImage} />}
                {image && (
                    <UserPhotoCropper
                        image={image.src}
                        onImageUpload={setImage}
                        onComplete={onCompleteHandler}
                    />
                )}
            </div>
        </div>
    );
};

export { PhotoUploaderModal };
