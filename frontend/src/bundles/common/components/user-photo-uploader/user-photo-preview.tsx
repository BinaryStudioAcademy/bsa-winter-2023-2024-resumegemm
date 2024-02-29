import { useCallback } from '../../hooks/hooks';
import { BaseButton } from '../components';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhoto: string;
    onHandleCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
}

const UserPhotoPreview: React.FC<UserPhotoProperties> = ({
    onToggleModal,
    currentPhoto,
    onHandleCurrentPhoto,
}) => {
    const handleEditClick = useCallback(() => {
        onToggleModal(true);
    }, [onToggleModal]);

    const handleDeleteClick = useCallback(() => {
        onHandleCurrentPhoto('');
    }, [onHandleCurrentPhoto]);

    return (
        <section className={styles.uploader_preview__wrapper}>
            <div className={styles.uploader_preview__photoThumb}>
                <img
                    src={currentPhoto}
                    alt="avatar"
                    className={styles.uploader_preview__photo}
                />
            </div>
            <div className={styles.uploader_preview__buttonThumb}>
                <BaseButton
                    onClick={handleEditClick}
                    className={styles.uploader_preview__button}
                >
                    Edit
                </BaseButton>
                <BaseButton
                    onClick={handleDeleteClick}
                    className={styles.uploader_preview__button}
                >
                    Delete
                </BaseButton>
            </div>
        </section>
    );
};

export { UserPhotoPreview };
