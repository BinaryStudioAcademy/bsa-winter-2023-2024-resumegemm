import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';
import { UserPhotoPlaceholder } from './user-photo-placeholder';

interface UserPhotoProperties {
    onClickUpload: React.Dispatch<React.SetStateAction<boolean>>;
  }

const UserPhotoMockup: React.FC<UserPhotoProperties> = ({ onClickUpload }) => {

    const handleClickUpload  = useCallback(() => {
        onClickUpload(true);
    }, [onClickUpload]);

    return (
        <button onClick={ handleClickUpload } className={styles.uploader_mockup}>
            <UserPhotoPlaceholder/>
            <p className={styles.uploader_mockup__text}>Upload photo</p>
        </button>
            );
};

export { UserPhotoMockup };