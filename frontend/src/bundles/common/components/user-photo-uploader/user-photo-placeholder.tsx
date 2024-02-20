import { IconContext } from 'react-icons';
import { ImUser } from 'react-icons/im';

import styles from './styles.module.scss';

const UserPhotoPlaceholder: React.FC = () => {
    return (
        <span className={styles.uploader_mockup_thumb}>
            <IconContext.Provider value={{ className: `${styles.uploader_mockup_icon}` }}>
                <ImUser/>
            </IconContext.Provider>
        </span>
    );
};

export { UserPhotoPlaceholder };