import { useParams } from 'react-router-dom';

import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import {
    useAppSelector,
    useLoadViewedResumes,
} from '~/bundles/common/hooks/hooks';
import { ResumePreview } from '~/bundles/resume-preview/components/components';

import styles from './styles.module.scss';

const Resume: React.FC = () => {
    // TODO: uncomment this line when redirect from Home with parasm ID is ready
    // const { id } = useParams();

    // TODO: remove this line when redirect from Home with parasm ID is ready
    const { resumes } = useAppSelector((state) => state.resumes);

    const { resumeViewHistory } = useLoadViewedResumes();

    // TODO: remove this line when redirect from Home with parasm ID is ready
    const id = resumes[0]?.resume.id;

    const getViewedResumeCount = (resumeId: string): number => {
        return resumeViewHistory[resumeId]?.length > 0
            ? resumeViewHistory[resumeId].length
            : 0;
    };

    const viewedResumeCount = getViewedResumeCount(id);

    return (
        <div>
            <div className={styles.resume__views_container}>
                <h3 className={styles.resume__title}>Product Designer</h3>
                <div className={styles.resume__views_count}>
                    <Icon size={IconSize.MEDIUM} name={IconName.EYE_OPEN} />
                    <span className={styles.resume__views_number}>
                        {viewedResumeCount}
                    </span>
                </div>
            </div>
            <ResumePreview />
        </div>
    );
};

export { Resume };
