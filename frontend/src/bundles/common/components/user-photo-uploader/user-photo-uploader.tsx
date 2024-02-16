import React, { useCallback } from 'react';
import { IconContext } from 'react-icons';
import { GrGallery } from 'react-icons/gr';

import styles from './styles.module.scss';

interface UploadProperties {
    setImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

const UserPhotoUploader: React.FC<UploadProperties> = ({ setImage }) => {

    const handleFile = useCallback((file: File) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        });
        reader.readAsDataURL(file);
    }, [setImage]);
  
    const handleFileChange  = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);
  
    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    
        const file = event.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);
  
    return (
        <div className={styles.photo_uploader__insert_block}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input className={styles.photo_uploader__insert_input}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
            />
            <label htmlFor="fileInput">
                <div className={styles.photo_uploader__insert_area}>
                    <IconContext.Provider value={{ className: `${styles.photo_uploader__insert_area__icon}` }}>
                        <GrGallery/>
                    </IconContext.Provider>
                    Click or drag & drop to upload from your computer
                </div>
            </label>
        </div>
    );
  };  

export { UserPhotoUploader };
