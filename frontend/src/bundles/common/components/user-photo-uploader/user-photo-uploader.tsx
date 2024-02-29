import { Notify } from 'notiflix/build/notiflix-notify-aio';
import React, { useCallback } from 'react';
import { IconContext } from 'react-icons';
import { GrGallery } from 'react-icons/gr';

import styles from './styles.module.scss';

interface UploadProperties {
    onImageUpload: React.Dispatch<
        React.SetStateAction<string | ArrayBuffer | null>
    >;
}

const UserPhotoUploader: React.FC<UploadProperties> = ({ onImageUpload }) => {
    const handleFile = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (reader.readyState === FileReader.DONE) {
                    onImageUpload(reader.result);
                }
            });
            reader.readAsDataURL(file);
        },
        [onImageUpload],
    );

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const allowedFormats = [
                    'image/jpeg',
                    'image/png',
                    'image/svg+xml',
                ];
                if (!allowedFormats.includes(file.type)) {
                    Notify.failure(
                        'Invalid file format. Please upload a JPEG, PNG, or SVG file.',
                    );
                    return;
                }
                const maxSizeInBytes = 10 * 1024 * 1024;
                if (file.size > maxSizeInBytes) {
                    Notify.failure(
                        'File size exceeds the limit of 10MB. Please upload a smaller file.',
                    );
                    return;
                }
                handleFile(file);
                Notify.success('File is successfully added.');
            }
        },
        [handleFile],
    );

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();
        },
        [],
    );

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.stopPropagation();

            const file = event.dataTransfer.files[0];
            handleFile(file);
        },
        [handleFile],
    );

    return (
        <div
            className={styles.uploader_insert__block}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                className={styles.uploader_insert__input}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
            />
            <label htmlFor="fileInput">
                <div className={styles.uploader_insert__area}>
                    <IconContext.Provider
                        value={{ className: `${styles.uploader_insert__icon}` }}
                    >
                        <GrGallery />
                    </IconContext.Provider>
                    Click or drag & drop to upload from your computer
                </div>
            </label>
        </div>
    );
};

export { UserPhotoUploader };