import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { ResumePreview } from '~/bundles/resume-preview/components/components';

import { useLoadViewedResumes } from '../use-load-viewed-resumes.hook';
import styles from './styles.module.scss';

const Resume: React.FC = () => {
    const { viewedResume } = useLoadViewedResumes();

    return (
        <div>
            <div>Number of resume views: {viewedResume.details.length}</div>
            <div className={styles.resume__views_container}>
                <Icon size={IconSize.MEDIUM} name={IconName.EYE_OPEN} />
                <span className={styles.resume__views_number}>
                    {viewedResume.details.length}
                </span>
            </div>
            <ResumePreview />
        </div>
    );
};

export { Resume };
