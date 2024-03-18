import { NavLink } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums';

import { PlusCircleIcon } from '../../../icons/plus-circle-icon';
import { ResumeIcon } from '../../../icons/resume-icon';
import styles from './styles.module.scss';

const CreateResumeButton: React.FC = () => (
    <NavLink to={AppRoute.RESUME_CREATE}>
        <div className={styles.container}>
            <div className={styles.create_resume_button}>
                <div className={styles.create_resume_button__icon}>
                    <PlusCircleIcon
                        className={
                            styles.create_resume_button__icon__plus_circle
                        }
                    />
                    <ResumeIcon
                        className={styles.create_resume_button__icon__resume}
                    />
                </div>
                <span className={styles.create_resume_button__text}>
                    Create a resume
                </span>
            </div>
        </div>
    </NavLink>
);

export { CreateResumeButton };
