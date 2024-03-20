import { useCallback, useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import ShareIcon from '~/assets/img/share-icon.svg?react';
import { actions as authActions } from '~/bundles/auth/store/auth.store.js';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useResumes,
} from '~/bundles/common/hooks/hooks';
import { ResumeAiReview } from '~/bundles/resume/components/components';
import { DownloadResumeLimitModal } from '~/bundles/resume/components/download-resume-limit-modal/download-resume-limit-modal';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';
import { actions as resumeActions } from '~/bundles/resume/store/index.js';
import { actions as userActions } from '~/bundles/users/store/user.store.js';

import { Header, RegularButton } from '../../../components';
import styles from './styles.module.scss';

const ResumesHeader: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        dataStatus,
    } = useResumes();

    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const { userId, userStripeId, pdfDownloads } = useAppSelector(
        ({ auth }) => ({
            userId: auth.user?.id,
            userStripeId: auth.user?.stripeId,
            pdfDownloads: auth.user?.pdfDownloads,
        }),
    );

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
            <Header>
                <div className={styles.resume_header__container}>
                    <RegularButton
                        onClick={createResumeAccessLink}
                        variant={ButtonVariant.GHOST}
                    >
                        <ShareIcon className={styles.share__icon} />
                    </RegularButton>
                    <ResumeAiReview
                        resumeReview={resumeReview}
                        dataStatus={dataStatus}
                        requestResumeReviewFromAI={requestResumeReviewFromAI}
                    />
                    <RegularButton
                        onClick={handleDownloadClick}
                        variant={ButtonVariant.PRIMARY}
                    >
                        Download
                    </RegularButton>
                </div>
            </Header>
            {showModal && (
                <DownloadResumeLimitModal
                    isOpen={showModal}
                    onClose={handleCloseClick}
                />
            )}
        </>
    );
};

export { ResumesHeader };
