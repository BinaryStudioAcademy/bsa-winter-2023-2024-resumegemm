import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhoto: string;
    setCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
  }

const UserPhotoPreview: React.FC<UserPhotoProperties> = ({ setIsModalOpen, currentPhoto, setCurrentPhoto }) => {

    const onEditClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const onDeleteClick = useCallback(() => {
        setCurrentPhoto('');
    }, [setCurrentPhoto]);

    return(
        <section className={styles.photo_uploader__preview_wrapper}>
            <div className={styles.photo_uploader__preview_photoThumb}>
                <img src={currentPhoto} alt="avatar" className={styles.photo_uploader__preview_photo}/>
            </div>
            <div className={styles.photo_uploader__preview_buttonThumb}>
                <button type="button" onClick={onEditClick} className={styles.photo_uploader__preview_button}>Edit</button>
                <button type="button" onClick={onDeleteClick} className={styles.photo_uploader__preview_button}>Delete</button>
            </div>
        </section>
    );
};

export { UserPhotoPreview };