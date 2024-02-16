import React from 'react';

import { useState } from '../../hooks/hooks';
import { UserPhotoMockup } from './user-photo-mockup';
import { PhotoUploaderModal } from './user-photo-modal';
import { UserPhotoPreview } from './user-photo-preview';

const UserPhotoWrapper: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState('');

    return (
        <section>
            {!currentPhoto && <UserPhotoMockup setIsModalOpen={setIsModalOpen}/>}
            {isModalOpen && 
                <PhotoUploaderModal 
                    setIsModalOpen={setIsModalOpen}
                    setCurrentPhoto={setCurrentPhoto}
                />
            }
            {currentPhoto &&
                <UserPhotoPreview 
                    currentPhoto={currentPhoto}
                    setIsModalOpen={setIsModalOpen} 
                    setCurrentPhoto={setCurrentPhoto}
                />
            }
        </section>
    );
};

export { UserPhotoWrapper };

