import { 
    useCallback 
} from '../../hooks/hooks';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhoto: string;
    onHandleCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhotoPreview: React.FC<UserPhotoProperties> = ({ onToggleModal, currentPhoto, onHandleCurrentPhoto, onImageChange }) => {

    const handleEditClick  = useCallback(() => {
        onToggleModal(true);
    }, [onToggleModal]);

    const handleDeleteClick  = useCallback(() => {
        onHandleCurrentPhoto('');
    }, [onHandleCurrentPhoto]);

    return(
        <section className={styles.uploader_preview__wrapper}>
            <div className={styles.uploader_preview__photoThumb}>
                <img src={currentPhoto} alt="avatar" className={styles.uploader_preview_photo}/>
            </div>
            <div className={styles.uploader_preview__buttonThumb}>
                <button type="button" onClick={handleEditClick } className={styles.uploader_preview__button}>Edit</button>
                <button type="button" onClick={handleDeleteClick } className={styles.uploader_preview__button}>Delete</button>
            </div>
        </section>
    );
};

export { UserPhotoPreview };