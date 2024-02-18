import React from 'react';

import { useAppDispatch } from '~/bundles/common/hooks/hooks.js';
import { updateUserAvatar } from '~/bundles/profile/store/actions';

import { useCallback,useState } from '../../hooks/hooks';
import { UserPhotoMockup } from './user-photo-mockup';
import { PhotoUploaderModal } from './user-photo-modal';
import { UserPhotoPreview } from './user-photo-preview';

const UserPhotoWrapper: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState('');

    const [currentImage, setCurrentImage] = useState<{
        src: string;
        blob: Blob;
    } | null>(null);

    const dispatch = useAppDispatch();
    
    const handleImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const reader = new FileReader();
            const [newImage] = event.target.files ?? [];

            reader.addEventListener('load', () => {
                setCurrentImage({
                    src: reader.result as string,
                    blob: newImage
                });
            });
            reader.readAsDataURL(newImage);
            const formData = new FormData();
            formData.append('file', newImage);
            void dispatch(updateUserAvatar(formData));
        },
        [setCurrentImage, dispatch],
    );

    // When backend is ready - change currentPhoto to currentImage
    return (
        <section>
            {!currentPhoto && <UserPhotoMockup setIsModalOpen={setIsModalOpen}/>}
            {isModalOpen && 
                <PhotoUploaderModal 
                    setIsModalOpen={setIsModalOpen}
                    setCurrentPhoto={setCurrentPhoto}
                    handleImageChange={handleImageChange}
                />
            }
            {currentPhoto &&
                <UserPhotoPreview 
                    currentPhoto={currentPhoto}
                    setIsModalOpen={setIsModalOpen} 
                    setCurrentPhoto={setCurrentPhoto}
                    handleImageChange={handleImageChange}
                />
            }
        </section>
    );
};

export { UserPhotoWrapper };

