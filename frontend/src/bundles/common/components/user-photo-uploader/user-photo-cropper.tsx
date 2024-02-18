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
    image: string | ArrayBuffer | null;
    setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhotoCropper: React.FC<UploadCropperProperties> = ({ image, setImage, setIsModalOpen, setCurrentPhoto, handleImageChange }) => {
    const [croppedImage, setCroppedImage] = useState<string | undefined | null>(null);
    const cropperReference = useRef<ReactCropperElement>(null);

    const handleCrop = useCallback(() => {
        const croppedCanvas = cropperReference.current?.cropper.getCroppedCanvas();
        const croppedImageUrl = croppedCanvas?.toDataURL('image/jpeg');
        setCroppedImage(croppedImageUrl);
    },[setCroppedImage]);

    // When backend is ready - change handleSave to handleImageChange

    const handleSave = useCallback(() => {
        if (croppedImage) {
            setCurrentPhoto(croppedImage);
        }
        setIsModalOpen(false);
    },[croppedImage, setIsModalOpen, setCurrentPhoto]);

    const onNewPhotoClick = useCallback(() => {
        setImage('');
    }, [setImage]);

    const onRotate = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.rotate(90);
        }
    }, []);

    const onZoomIn = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(0.1);
        }
    }, []);

    const onZoomOut = useCallback(() => {
        if (cropperReference.current) {
            cropperReference.current.cropper.zoom(-0.1);
        }
    }, []);

    return (
        <div className={styles.photo_uploader__cropper_wrapper}>
            <React.Fragment>
                <Cropper
                    ref={cropperReference}
                    src={image as string}
                    className={styles.photo_uploader__cropper}
                    aspectRatio={1}
                    guides={true}
                    crop={handleCrop}
                    zoomTo={0} 
                    rotateTo={0} 
                />
                <div className={styles.photo_uploader__cropper_button_thumb}>
                    <button
                        onClick={onRotate}
                        className={styles.photo_uploader__cropper_button__rotate}
                    >
                        <IconContext.Provider value={{ className: `${styles.photo_uploader__cropper_button_icon__rotate}` }}>
                            <FaArrowRotateRight/>
                        </IconContext.Provider>
                    </button>
                    <button
                        onClick={onZoomIn}
                        className={styles.photo_uploader__cropper_button__zoomIn}
                    >
                        <IconContext.Provider value={{ className: `${styles.photo_uploader__cropper_button_icon__zoomIn}` }}>
                            <GrZoomIn/>
                        </IconContext.Provider>
                    </button>
                    <button
                        onClick={onZoomOut}
                        className={styles.photo_uploader__cropper_button__zoomOut}
                    >
                        <IconContext.Provider value={{ className: `${styles.photo_uploader__cropper_button_icon__zoomOut}` }}>
                            <GrZoomOut/>
                        </IconContext.Provider>
                    </button>
                </div>
                <div className={styles.photo_uploader__cropper_button_thumb}>
                    <button onClick={onNewPhotoClick} className={styles.photo_uploader__cropper_button__anotherPhoto}>
                        <IconContext.Provider value={{ className: `${styles.photo_uploader__cropper_button_icon__anotherPhoto}` }}>
                            <FaFileUpload/>
                        </IconContext.Provider>
                        Upload another photo
                    </button>
                    <button onClick={handleSave} className={styles.photo_uploader__cropper_button__save}>
                        <IconContext.Provider value={{ className: `${styles.photo_uploader__cropper_button_icon__save}` }}>
                            <BsSave/>
                        </IconContext.Provider>
                        Save image
                    </button>
                </div>
            </React.Fragment>
        </div>
    );
};
 
export { UserPhotoCropper };

