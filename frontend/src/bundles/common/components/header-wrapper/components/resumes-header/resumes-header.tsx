import { useCallback } from 'react';
import { renderToString } from 'react-dom/server';

import shareIcon from '~/assets/img/share-icon.svg';
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
                    <div
                        className={styles.share__icon}
                        style={{ maskImage: `url(${shareIcon})` }}
                    ></div>
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
    );
};

export { ResumesHeader };
