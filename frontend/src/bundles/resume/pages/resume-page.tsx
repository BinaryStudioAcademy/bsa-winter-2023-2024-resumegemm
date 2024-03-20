import { NavLink } from 'react-router-dom';

import { RegularButton } from '~/bundles/common/components/components';
import { AppRoute, ButtonVariant } from '~/bundles/common/enums/enums';
import { useResumes } from '~/bundles/common/hooks/hooks';
import { ResumeEditor } from '~/bundles/resume/components/resume-editor/resume-editor';

import styles from './styles.module.scss';

const ResumePage: React.FC = () => {
    const { templateSettings, id } = useResumes();

    return (
        <div className={styles.resume__wrapper}>
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
