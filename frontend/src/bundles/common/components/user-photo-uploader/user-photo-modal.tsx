import React, { useCallback,useState } from 'react';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';

import styles from './styles.module.scss';
import { UserPhotoCropper } from './user-photo-cropper';
import { UserPhotoUploader } from './user-photo-uploader';

interface UploadModalProperties {
    onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    onHandleCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoUploaderModal: React.FC<UploadModalProperties> = ({ onToggleModal, onHandleCurrentPhoto }) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>('');

    const handleClose  = useCallback(() => {
        onToggleModal(false);
    }, [onToggleModal]);

    return (
        <div className={styles.uploader_modal__backdrop}>
            <div className={styles.uploader_modal__overlay}>
                <button type="button" onClick={handleClose } className={styles.uploader_modal__button__close}>
                    <IconContext.Provider value={{ className: `${styles.uploader_modal__button__icon}` }}>
                        <IoClose/>
                    </IconContext.Provider>
                </button>
                {!image && <UserPhotoUploader onImageUpload={setImage}/>}
                {image && <UserPhotoCropper 
                    image={image as string} 
                    onImageUpload ={setImage} 
                    onComplete={onToggleModal} 
                    onHandleCurrentPhoto={onHandleCurrentPhoto}
                />}
            </div>
        </div>
    );
};

export { PhotoUploaderModal };