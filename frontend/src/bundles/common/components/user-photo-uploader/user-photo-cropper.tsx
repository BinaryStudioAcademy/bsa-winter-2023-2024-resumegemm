import 'cropperjs/dist/cropper.css';

import React, { useCallback,useRef,useState } from 'react';
import { type ReactCropperElement } from 'react-cropper';
import { Cropper } from 'react-cropper';
import { IconContext } from 'react-icons';
import { BsSave } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { GrZoomIn , GrZoomOut } from 'react-icons/gr';

import styles from './styles.module.scss';

interface UploadCropperProperties {
    image: string | ArrayBuffer;
    onImageUpload : React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
    onComplete: React.Dispatch<React.SetStateAction<boolean>>;
    onHandleCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
    onHandleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhotoCropper: React.FC<UploadCropperProperties> = ({ image, onImageUpload , onComplete, onHandleCurrentPhoto, onHandleImage }) => {
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const cropperReference = useRef<ReactCropperElement>(null);

    const handleCrop = useCallback(() => {
        const croppedCanvas = cropperReference.current?.cropper.getCroppedCanvas();
        const croppedImageUrl = croppedCanvas?.toDataURL('image/jpeg');
        if (croppedImageUrl) {
            setCroppedImage(croppedImageUrl);
        }
    },[setCroppedImage]);

    const handleSave = useCallback(() => {
        if (croppedImage) {
            onHandleCurrentPhoto(croppedImage);
        }
        onComplete(false);
    },[croppedImage, onComplete, onHandleCurrentPhoto]);

    const handleNewPhotoClick = useCallback(() => {
        onImageUpload ('');
    }, [onImageUpload ]);

    const handleRotate = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.rotate(90);
        }
    }, []);

    const handleZoomIn = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(0.1);
        }
    }, []);

    const handleZoomOut = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(-0.1);
        }
    }, []);

    return (
        <div className={styles.uploader_cropper__wrapper}>
                <Cropper
                    ref={cropperReference}
                    src={image as string}
                    className={styles.uploader_cropper}
                    aspectRatio={1}
                    guides
                    crop={handleCrop}
                    zoomTo={0} 
                    rotateTo={0} 
                />
                <div className={styles.uploader_cropper__button_thumb}>
                    <button
                        onClick={handleRotate}
                        className={styles.uploader_cropper__button__rotate}
                    >
                        <IconContext.Provider value={{ className: `${styles.uploader_cropper__button_icon__rotate}` }}>
                            <FaArrowRotateRight/>
                        </IconContext.Provider>
                    </button>
                    <button
                        onClick={handleZoomIn}
                        className={styles.uploader_cropper__button__zoomIn}
                    >
                        <IconContext.Provider value={{ className: `${styles.uploader_cropper__button_icon__zoomIn}` }}>
                            <GrZoomIn/>
                        </IconContext.Provider>
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className={styles.uploader_cropper__button__zoomOut}
                    >
                        <IconContext.Provider value={{ className: `${styles.uploader_cropper__button_icon__zoomOut}` }}>
                            <GrZoomOut/>
                        </IconContext.Provider>
                    </button>
                </div>
                <div className={styles.uploader_cropper__button_thumb}>
                    <button onClick={handleNewPhotoClick} className={styles.uploader_cropper__button__anotherPhoto}>
                        <IconContext.Provider value={{ className: `${styles.uploader_cropper__button_icon__anotherPhoto}` }}>
                            <FaFileUpload/>
                        </IconContext.Provider>
                        Upload another photo
                    </button>
                    <button onClick={handleSave} className={styles.uploader_cropper__button__save}>
                        <IconContext.Provider value={{ className: `${styles.uploader_cropper__button_icon__save}` }}>
                            <BsSave/>
                        </IconContext.Provider>
                        Save image
                    </button>
                </div>
        </div>
    );
};
 
export { UserPhotoCropper };

