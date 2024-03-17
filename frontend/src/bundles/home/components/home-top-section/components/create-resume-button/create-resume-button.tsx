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
    const [showModal, setShowModal] = useState(false);

    const { userStripeId, resumeViewCount } = useAppSelector(
        ({ auth, resumes }) => ({
            userStripeId: auth.user?.stripeId,
            resumeViewCount: resumes.resumeViews?.length,
        }),
    );

    const navigate = useNavigate();

    const handleClickCreateResume = useCallback((): void => {
        if (userStripeId === null && resumeViewCount > 0) {
            setShowModal(true);
        } else {
            navigate({ pathname: AppRoute.RESUME_CREATE });
        }
    }, [userStripeId, resumeViewCount, navigate]);

    const handleCloseClick = useCallback((): void => {
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
                    onClose={handleCloseClick}
                />
            )}
        </>
    );
};

export { CreateResumeButton };
