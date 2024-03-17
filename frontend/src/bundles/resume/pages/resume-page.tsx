import { renderToString } from 'react-dom/server';
import { NavLink, useParams } from 'react-router-dom';

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
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as resumeActions } from '~/bundles/resume/store/index.js';
import { ResumePreview } from '~/bundles/resume-preview/components/components';
import { actions as userActions } from '~/bundles/users/store/user.store.js';

import { DownloadResumeLimitModal } from '../components/download-resume-limit-modal/download-resume-limit-modal';
import { ResumeEditor } from '../components/resume-editor/resume-editor';
import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const { userId, userStripeId, pdfDownloads, resumes, templateSettings } =
        useAppSelector(({ auth, resumes }) => ({
            userId: auth.user?.id,
            userStripeId: auth.user?.stripeId,
            pdfDownloads: auth.user?.pdfDownloads,
            resumes: resumes.resumeViews,
            templateSettings: resumes.templateSettings,
        }));

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
                <DownloadResumeLimitModal
                    isOpen={showModal}
                    onClose={handleCloseClick}
                />
            )}
        </>
    );
};

export { ResumePage };
