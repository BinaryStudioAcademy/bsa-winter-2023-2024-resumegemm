import { renderToString } from 'react-dom/server';

import shareIcon from '~/assets/img/share-icon.svg';
import { Header, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback, useResumes } from '~/bundles/common/hooks/hooks';
import { TemplateEditor } from '~/bundles/edit-template/components/template-editor/template-editor';
import { ResumeAiReview } from '~/bundles/resume/components/components';

import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        downloadGeneratedFile,
        dataStatus,
    } = useResumes();

    const HTMLFromComponentOrEmptyString = templateSettings
        ? renderToString(<TemplateEditor settings={templateSettings} />)
        : '';

    const handleDownloadClick = useCallback(() => {
        downloadGeneratedFile(HTMLFromComponentOrEmptyString);
    }, [downloadGeneratedFile, HTMLFromComponentOrEmptyString]);

    return (
        <div className={styles.resume__wrapper}>
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
            <div className={styles.resume__page}>
                {templateSettings && (
                    <TemplateEditor settings={templateSettings} />
                )}
            </div>
        </div>
    );
};

export { ResumePage };
