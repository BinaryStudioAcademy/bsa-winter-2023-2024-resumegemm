import { NavLink } from 'react-router-dom';

import { Icon, RegularButton } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonVariant,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { useAppSelector, useResumes } from '~/bundles/common/hooks/hooks';

import { ResumeEditor } from '../components/resume-editor/resume-editor';
import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const { templateSettings, id } = useResumes();

    const { resumes } = useAppSelector(({ resumes }) => ({
        resumes: resumes.resumeViews,
    }));

    const currentResumeViews = resumes.find(
        (resume) => resume.resumeId === id,
    )?.views;

    return (
        <>
            <div className={styles.resume__wrappers}>
                <div className={styles.resume__views_container}>
                    <h3 className={styles.resume__title}>Product Designer</h3>
                    <div className={styles.resume__views_count}>
                        <Icon size={IconSize.MEDIUM} name={IconName.EYE_OPEN} />
                        <span className={styles.resume__views_number}>
                            {currentResumeViews}
                        </span>
                    </div>
                </div>
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
        </>
    );
};

export { ResumePage };
