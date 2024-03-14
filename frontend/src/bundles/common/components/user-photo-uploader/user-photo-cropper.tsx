import 'cropperjs/dist/cropper.css';

import React, { useCallback, useRef, useState } from 'react';
import { type ReactCropperElement, Cropper } from 'react-cropper';
import { IconContext } from 'react-icons';
import { BsSave } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { GrZoomIn, GrZoomOut } from 'react-icons/gr';

import { ButtonSize, ButtonVariant } from '../../enums/enums';
import { IconButton, RegularButton } from '../components';
import styles from './styles.module.scss';
import { type Image, type ImageBlob } from './types/types';

interface UploadCropperProperties {
    image: Image;
    onImageUpload: React.Dispatch<React.SetStateAction<ImageBlob | null>>;
    onComplete: ({ src, blob }: ImageBlob) => void;
}

const UserPhotoCropper: React.FC<UploadCropperProperties> = ({
    image,
    onImageUpload,
    onComplete,
}) => {
    const [croppedImage, setCroppedImage] = useState<ImageBlob | null>(null);

    const cropperReference = useRef<ReactCropperElement>(null);

    const handleCrop = useCallback(() => {
        const croppedCanvas =
            cropperReference.current?.cropper.getCroppedCanvas();
        const croppedImageUrl = croppedCanvas?.toDataURL('image/jpeg');
        croppedCanvas?.toBlob((blob) => {
            if (croppedImageUrl && blob) {
                setCroppedImage({ src: croppedImageUrl, blob });
            }
        });
    }, [setCroppedImage]);

    const handleSave = useCallback(() => {
        if (croppedImage) {
            onComplete(croppedImage);
        }
    }, [onComplete, croppedImage]);

    const handleNewPhotoClick = useCallback(() => {
        onImageUpload(null);
    }, [onImageUpload]);

    const handleRotate = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.rotate(90);
        }
    }, [cropperReference]);

    const handleZoomIn = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(0.1);
        }
    }, [cropperReference]);

    const handleZoomOut = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(-0.1);
        }
    }, [cropperReference]);

    return (
        <div className={styles.uploader_cropper__wrapper}>
            <Cropper
                ref={cropperReference}
                src={String(image)}
                className={styles.uploader_cropper}
                aspectRatio={1}
                guides
                crop={handleCrop}
                zoomTo={0}
                rotateTo={0}
            />
            <div className={styles.uploader_cropper__buttonThumb}>
                <IconButton
                    onClick={handleRotate}
                    className={styles.uploader_cropper__button__rotate}
                >
                    <IconContext.Provider
                        value={{
                            className: `${styles.uploader_cropper__icon__rotate}`,
                        }}
                    >
                        <FaArrowRotateRight />
                    </IconContext.Provider>
                </IconButton>
                <IconButton
                    onClick={handleZoomIn}
                    className={styles.uploader_cropper__button__zoomIn}
                >
                    <IconContext.Provider
                        value={{
                            className: `${styles.uploader_cropper__icon__zoomIn}`,
                        }}
                    >
                        <GrZoomIn />
                    </IconContext.Provider>
                </IconButton>
                <IconButton
                    onClick={handleZoomOut}
                    className={styles.uploader_cropper__button__zoomOut}
                >
                    <IconContext.Provider
                        value={{
                            className: `${styles.uploader_cropper__icon__zoomOut}`,
                        }}
                    >
                        <GrZoomOut />
                    </IconContext.Provider>
                </IconButton>
            </div>
            <div className={styles.uploader_cropper__buttonThumb}>
                <RegularButton
                    prependedIcon={<FaFileUpload />}
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleNewPhotoClick}
                    className={styles.uploader_cropper__button__anotherPhoto}
                >
                    Upload another photo
                </RegularButton>
                <RegularButton
                    prependedIcon={<BsSave />}
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleSave}
                    className={styles.uploader_cropper__button__save}
                >
                    Save image
                </RegularButton>
            </div>
        </div>
    );
};

export { UserPhotoCropper };
