import React, { useCallback,useState } from 'react';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';

import styles from './styles.module.scss';
import { UserPhotoCropper } from './user-photo-cropper';
import { UserPhotoUploader } from './user-photo-uploader';

interface UploadModalProperties {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploaderModal: React.FC<UploadModalProperties> = ({ setIsModalOpen, setCurrentPhoto, handleImageChange }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>('');

    const onClose = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    return (
        <div className={styles.photo_uploader__modal_backdrop}>
            <div className={styles.photo_uploader__modal_overlay}>
                <button type="button" onClick={onClose} className={styles.photo_uploader__modal_button__close}>
                    <IconContext.Provider value={{ className: `${styles.photo_uploader__modal_button__icon}` }}>
                        <IoClose/>
                    </IconContext.Provider>
                </button>
                {!image && <UserPhotoUploader setImage={setImage}/>}
                {image && <UserPhotoCropper 
                    image={image} 
                    setImage={setImage} 
                    setIsModalOpen={setIsModalOpen} 
                    setCurrentPhoto={setCurrentPhoto}
                    handleImageChange={handleImageChange}
                />}
            </div>
        </div>
    );
};

export { PhotoUploaderModal };