import { renderToString } from 'react-dom/server';
import { NavLink } from 'react-router-dom';

import shareIcon from '~/assets/img/share-icon.svg';
import { actions as authActions } from '~/bundles/auth/store/auth.store.js';
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
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useResumes,
    useState,
} from '~/bundles/common/hooks/hooks';
import { ResumeAiReview } from '~/bundles/resume/components/components';
import { actions as resumeActions } from '~/bundles/resume/store/index.js';
import { actions as userActions } from '~/bundles/users/store/user.store.js';

import { DownloadResumeLimitModal } from '../components/download-resume-limit-modal/download-resume-limit-modal';
import { ResumeEditor } from '../components/resume-editor/resume-editor';
import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        dataStatus,
        id,
    } = useResumes();

    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const { userId, userStripeId, pdfDownloads, resumes } = useAppSelector(
        ({ auth, resumes }) => ({
            userId: auth.user?.id,
            userStripeId: auth.user?.stripeId,
            pdfDownloads: auth.user?.pdfDownloads,
            resumes: resumes.resumeViews,
        }),
    );

    const currentResumeViews = resumes.find(
        (resume) => resume.resumeId === id,
    )?.views;

    const downloadGeneratedFile = useCallback(
        async (html: string) => {
            void dispatch(resumeActions.downloadPDFDocument({ html }));
            if (userId) {
                await dispatch(userActions.incrementPDFDownloads(userId));
                setIsDownloaded(true);
            }
        },
        [dispatch, userId],
    );

    const HTMLFromComponentOrEmptyString = templateSettings
        ? renderToString(<ResumeEditor templateSettings={templateSettings} />)
        : '';

    const handleDownloadClick = useCallback(() => {
        if (userStripeId === null && pdfDownloads && pdfDownloads > 0) {
            setShowModal(true);
        } else {
            void downloadGeneratedFile(HTMLFromComponentOrEmptyString);
        }
    }, [
        HTMLFromComponentOrEmptyString,
        downloadGeneratedFile,
        pdfDownloads,
        userStripeId,
    ]);

    const handleCloseClick = useCallback((): void => {
        setShowModal(false);
    }, []);

    useEffect(() => {
        if (isDownloaded) {
            if (userId) {
                void dispatch(authActions.getUser());
            }
            setIsDownloaded(false);
        }
    }, [dispatch, userId, isDownloaded]);

    return (
        <>
            <div className={styles.resume__wrappers}>
                <Header>
                    <div className={styles.resume__actions}>
                        <RegularButton
                            onClick={createResumeAccessLink}
                            variant={ButtonVariant.GHOST}
                        >
                            <div
                                className={styles.share__icon}
                                style={{ maskImage: `url(${shareIcon})` }}
                            ></div>
                        </RegularButton>
                        <ResumeAiReview
                            resumeReview={resumeReview}
                            dataStatus={dataStatus}
                            requestResumeReviewFromAI={
                                requestResumeReviewFromAI
                            }
                        />

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
                <div className={styles.resume__page}>
                    {templateSettings && (
                        <ResumeEditor templateSettings={templateSettings} />
                    )}
                </div>
                <div className={styles.resume__wrapper_footer}>
                    <NavLink to={`${AppRoute.RESUME_EDIT}/${id}`}>
                        <RegularButton variant={ButtonVariant.DEFAULT}>
                            Edit Resume
                        </RegularButton>
                    </NavLink>
                </div>
            </div>
            {showModal && (
                <DownloadResumeLimitModal
                    isOpen={showModal}
                    onClose={handleCloseClick}
                />
            )}
        </>
    );
};

export { ResumePage };
