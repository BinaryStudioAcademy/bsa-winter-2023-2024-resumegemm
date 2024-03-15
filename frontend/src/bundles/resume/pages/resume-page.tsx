import { renderToString } from 'react-dom/server';
import { NavLink } from 'react-router-dom';

import shareIcon from '~/assets/img/share-icon.svg';
import { Header, RegularButton } from '~/bundles/common/components/components';
import { AppRoute, ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback, useResumes } from '~/bundles/common/hooks/hooks';
import { ResumeAiReview } from '~/bundles/resume/components/components';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        downloadGeneratedFile,
        dataStatus,
        id,
    } = useResumes();

    const HTMLFromComponentOrEmptyString = templateSettings
        ? renderToString(<ResumeEditor templateSettings={templateSettings} />)
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
    );
};

export { ResumePage };
