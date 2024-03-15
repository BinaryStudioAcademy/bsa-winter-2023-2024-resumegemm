import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { CreateResumeLimitModal } from '~/bundles/resume/components/create-resume-limit-modal/create-resume-limit-modal';

import { PlusCircleIcon } from '../../../icons/plus-circle-icon';
import { ResumeIcon } from '../../../icons/resume-icon';
import styles from './styles.module.scss';

const CreateResumeButton: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleClickCreateResume = useCallback((): void => {
        if (user?.stripeId === null) {
            setShowModal(true);
        } else {
            navigate(AppRoute.RESUME_CREATE);
        }
    }, [user, navigate]);

    const handleClickClose = useCallback((): void => {
        setShowModal(false);
    }, []);

    return (
        <>
            <button
                className={styles.container}
                onClick={handleClickCreateResume}
            >
                <div className={styles.create_resume_button}>
                    <div className={styles.create_resume_button__icon}>
                        <PlusCircleIcon
                            className={
                                styles.create_resume_button__icon__plus_circle
                            }
                        />
                        <ResumeIcon
                            className={
                                styles.create_resume_button__icon__resume
                            }
                        />
                    </div>
                    <span className={styles.create_resume_button__text}>
                        Create a resume
                    </span>
                </div>
            </button>
            {showModal && (
                <CreateResumeLimitModal
                    isOpen={showModal}
                    onClose={handleClickClose}
                />
            )}
        </>
    );
};

export { CreateResumeButton };
