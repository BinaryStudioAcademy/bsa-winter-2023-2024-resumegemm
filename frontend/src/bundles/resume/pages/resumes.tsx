import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { ResumePreview } from '~/bundles/resume-preview/components/components';

import { useLoadViewedResumes } from '../use-load-viewed-resumes.hook';
import styles from './styles.module.scss';

const Resume: React.FC = () => {
    const { resumes } = useAppSelector((state) => state.resumes);
    const { resumeViewHistory } = useLoadViewedResumes();

    const id = resumes[0]?.resume?.id;

    const getViewedResumeCount = (resumeId: string): number => {
        return resumeViewHistory[resumeId].length > 0
            ? resumeViewHistory[resumeId].length
            : 0;
    };

    const viewedResumeCount = getViewedResumeCount(id);

    return (
        <div>
            <div>Number of resume views: {viewedResumeCount}</div>
            <div className={styles.resume__views_container}>
                <Icon size={IconSize.MEDIUM} name={IconName.EYE_OPEN} />
                <span className={styles.resume__views_number}>
                    {viewedResumeCount}
                </span>
            </div>
            <ResumePreview />
        </div>
    );
};

export { Resume };
