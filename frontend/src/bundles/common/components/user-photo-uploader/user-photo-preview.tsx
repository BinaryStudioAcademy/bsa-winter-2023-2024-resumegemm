// import { UserProfileResponce } from 'shared/build/bundles/users/types/user-auth-response.type';
// import { UserPhotoPlaceholder } from './user-photo-placeholder';
// import { updateUserAvatar } from '~/bundles/profile/store/actions';

import { 
    // useAppDispatch, 
    // useAppSelector, 
    useCallback 
} from '../../hooks/hooks';
import styles from './styles.module.scss';

interface UserPhotoProperties {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhoto: string;
    setCurrentPhoto: React.Dispatch<React.SetStateAction<string>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserPhotoPreview: React.FC<UserPhotoProperties> = ({ setIsModalOpen, currentPhoto, setCurrentPhoto, handleImageChange }) => {

    // const dispatch = useAppDispatch();
    // const user = useAppSelector(({ auth }) => {
    //     return auth.user as UserProfileResponce;
    // });

    const onEditClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const onDeleteClick = useCallback(() => {
        // When backend is ready - change setCurrentPhoto to void dispatch(updateUserAvatar(formData))
        setCurrentPhoto('');

        // const formData = new FormData();
        // formData.append('file', '');
        // void dispatch(updateUserAvatar(formData));          ???????????????????
    }, [setCurrentPhoto]);

    // When backend is ready - change src={currentPhoto} to src={user.avatar}

    return(
        <section className={styles.photo_uploader__preview_wrapper}>
            {/* {user.avatar 
            ?  */}
            <div className={styles.photo_uploader__preview_photoThumb}>
                <img src={currentPhoto} alt="avatar" className={styles.photo_uploader__preview_photo}/>
            </div>
            {/* :
            <UserPhotoPlaceholder/>
            } */}
            <div className={styles.photo_uploader__preview_buttonThumb}>
                <button type="button" onClick={onEditClick} className={styles.photo_uploader__preview_button}>Edit</button>
                <button type="button" onClick={onDeleteClick} className={styles.photo_uploader__preview_button}>Delete</button>
            </div>
        </section>
    );
};

export { UserPhotoPreview };