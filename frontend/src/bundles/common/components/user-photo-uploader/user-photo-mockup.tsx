import { IconContext } from 'react-icons';
import { ImUser } from 'react-icons/im';

import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const UserPhotoMockup: React.FC<UserPhotoProperties> = ({ setIsModalOpen }) => {

    const onClickUpload = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    return (
            <button onClick={onClickUpload} className={styles.photo_uploader__mockup}>
                <span className={styles.photo_uploader__mockup_thumb}>
                    <IconContext.Provider value={{ className: `${styles.photo_uploader__mockup_icon}` }}>
                        <ImUser/>
                    </IconContext.Provider>
                </span>
                <p className={styles.photo_uploader__mockup_text}>Upload photo</p>
            </button>
            );
};

export { UserPhotoMockup };