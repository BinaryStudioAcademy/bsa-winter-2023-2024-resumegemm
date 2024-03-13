import shareIcon from '~/assets/img/share-icon.svg';
import { Header, RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useResumes } from '~/bundles/common/hooks/hooks';
import { TemplateEditor } from '~/bundles/edit-template/components/template-editor/template-editor';
import { ResumeAiReview } from '~/bundles/resume/components/components';

import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const {
        templateSettings,
        createResumeAccessLink,
        resumeReview,
        requestResumeReviewFromAI,
        dataStatus,
    } = useResumes();
    if (!templateSettings) {
        return null;
    }
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
                    <RegularButton variant={ButtonVariant.PRIMARY}>
                        Download
                    </RegularButton>
                </div>
            </Header>
            <div className={styles.resume__page}>
                <TemplateEditor settings={templateSettings} />
            </div>
        </div>
    );
};

export { ResumePage };
