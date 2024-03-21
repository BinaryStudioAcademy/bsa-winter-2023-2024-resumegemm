import { useCallback } from 'react';
import { renderToString } from 'react-dom/server';

import ShareIcon from '~/assets/img/share-icon.svg?react';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useResumes } from '~/bundles/common/hooks/hooks';
import { ResumeAiReview } from '~/bundles/resume/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import { Header, RegularButton } from '../../../components';
import styles from './styles.module.scss';

const ResumesHeader: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        downloadGeneratedFile,
        dataStatus,
        hasSubscription,
    } = useResumes();

    const HTMLFromComponentOrEmptyString = templateSettings
        ? renderToString(<ResumeEditor templateSettings={templateSettings} />)
        : '';

    const handleDownloadClick = useCallback(() => {
        downloadGeneratedFile(HTMLFromComponentOrEmptyString);
    }, [downloadGeneratedFile, HTMLFromComponentOrEmptyString]);

    return (
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
                {hasSubscription && (
                    <RegularButton
                        onClick={handleDownloadClick}
                        variant={ButtonVariant.PRIMARY}
                    >
                        Download
                    </RegularButton>
                )}
            </div>
        </Header>
    );
};

export { ResumesHeader };
