import { useParams } from 'react-router-dom';

import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { ResumePreview } from '~/bundles/resume-preview/components/components';

import styles from './styles.module.scss';

const Resume: React.FC = () => {
    const resumeViews = useAppSelector(({ resumes }) => resumes.resumeViews);

    const { id } = useParams();
    const currentResume = resumeViews.find((resume) => resume.resumeId === id);

    const currentResumeViews = currentResume?.views;

    return (
        <div>
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
        </div>
    );
};

export { Resume };
