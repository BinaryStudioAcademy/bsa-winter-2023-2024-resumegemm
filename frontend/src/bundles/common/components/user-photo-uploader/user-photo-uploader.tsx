import React, { useCallback, useContext } from 'react';
import { IconContext } from 'react-icons';
import { GrGallery } from 'react-icons/gr';

import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';

import styles from './styles.module.scss';
import { type ImageBlob } from './types/image-blob.type';

interface UploadProperties {
    onImageUpload: React.Dispatch<React.SetStateAction<ImageBlob | null>>;
}

const UserPhotoUploader: React.FC<UploadProperties> = ({ onImageUpload }) => {
    const { showToast } = useContext(ToastContext);

    const handleFile = useCallback(
        (file: File) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (reader.readyState === FileReader.DONE) {
                    onImageUpload({ src: reader.result, blob: file });
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
                    showToast(
                        'Invalid file format. Please upload a JPEG, PNG, or SVG file.',
                        ToastType.ERROR,
                        {
                            theme: 'dark',
                        },
                    );
                    return;
                }
                const maxSizeInBytes = 10 * 1024 * 1024;
                if (file.size > maxSizeInBytes) {
                    showToast(
                        'File size exceeds the limit of 10MB. Please upload a smaller file.',
                        ToastType.ERROR,
                        {
                            theme: 'dark',
                        },
                    );
                    return;
                }
                handleFile(file);
                showToast('File is successfully added!', ToastType.SUCCESS);
            }
        },
        [handleFile, showToast],
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
