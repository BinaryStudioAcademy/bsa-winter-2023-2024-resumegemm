import { NavLink, useParams } from 'react-router-dom';

import shareIcon from '~/assets/img/share-icon.svg';
import {
    Header,
    Icon,
    RegularButton,
} from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonVariant,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { ResumePreview } from '~/bundles/resume-preview/components/components';

import { DownloadResumeRestrictionModal } from '../components/download-resume-restriction-modal/download-resume-restriction-modal';
import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const { userStripeId, resumeViews } = useAppSelector(
        ({ auth, resumes }) => ({
            userStripeId: auth.user?.stripeId,
            resumeViews: resumes.resumeViews,
        }),
    );

    const { id } = useParams();
    const currentResume = resumeViews.find((resume) => resume.resumeId === id);

    const currentResumeViews = currentResume?.views;

    const downloadedDPF = 1;

    const handleDownloadClick = useCallback(() => {
        if (userStripeId === null && downloadedDPF > 0) {
            setShowModal(true);
        } else {
            return;
        }
    }, [userStripeId]);

    const handleCloseClick = useCallback((): void => {
        setShowModal(false);
    }, []);

    return (
        <>
            <div className={styles.resume__wrappers}>
                <Header>
                    <div className={styles.resume__actions}>
                        <RegularButton
                            // onClick={createResumeAccessLink}
                            variant={ButtonVariant.GHOST}
                        >
                            <div
                                className={styles.share__icon}
                                style={{ maskImage: `url(${shareIcon})` }}
                            ></div>
                        </RegularButton>
                        <RegularButton
                            onClick={handleDownloadClick}
                            variant={ButtonVariant.PRIMARY}
                        >
                            Download
                        </RegularButton>
                    </div>
                </Header>
                <div className={styles.resume__views_container}>
                    <h3 className={styles.resume__title}>Product Designer</h3>
                    <div className={styles.resume__views_count}>
                        <Icon size={IconSize.MEDIUM} name={IconName.EYE_OPEN} />
                        <span className={styles.resume__views_number}>
                            {currentResumeViews}
                        </span>
                    </div>
                </div>
                <ResumePreview />
                <div className={styles.resume__wrapper_footer}>
                    <NavLink to={`${AppRoute.RESUME_EDIT}/${id}`}>
                        <RegularButton variant={ButtonVariant.DEFAULT}>
                            Edit Resume
                        </RegularButton>
                    </NavLink>
                </div>
            </div>
            {showModal && (
                <DownloadResumeRestrictionModal
                    isOpen={showModal}
                    onClose={handleCloseClick}
                />
            )}
        </>
    );
};

export { ResumePage };
