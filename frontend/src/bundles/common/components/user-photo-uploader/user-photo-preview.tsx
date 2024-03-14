import { ButtonSize, ButtonVariant } from '../../enums/enums';
import { useCallback } from '../../hooks/hooks';
import { RegularButton } from '../components';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhoto: string;
    onHandleCurrentPhoto: React.Dispatch<null>;
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
        onHandleCurrentPhoto(null);
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
                <RegularButton
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.GHOST}
                    onClick={handleEditClick}
                    className={styles.uploader_preview__button}
                >
                    Edit
                </RegularButton>
                <RegularButton
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.GHOST}
                    onClick={handleDeleteClick}
                    className={styles.uploader_preview__button}
                >
                    Delete
                </RegularButton>
            </div>
        </section>
    );
};

export { UserPhotoPreview };
