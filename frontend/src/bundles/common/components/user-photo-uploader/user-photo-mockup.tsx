import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';
import { UserPhotoPlaceholder } from './user-photo-placeholder';

interface UserPhotoProperties {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const UserPhotoMockup: React.FC<UserPhotoProperties> = ({ setIsModalOpen }) => {

    const onClickUpload = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    return (
        <button onClick={onClickUpload} className={styles.photo_uploader__mockup}>
            <UserPhotoPlaceholder/>
            <p className={styles.photo_uploader__mockup_text}>Upload photo</p>
        </button>
            );
};

export { UserPhotoMockup };