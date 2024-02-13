import plusCircleIcon from '~/assets/img/plusCircleIcon.svg';
import resumeIcon from '~/assets/img/resumeIcon.svg';

import styles from './styles.module.scss';

const CreateResumeButton: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.create_resume_button}>
                <div className={styles.create_resume_button__icon}>
                    <img
                        src={plusCircleIcon}
                        alt="Create resume"
                        className={
                            styles.create_resume_button__icon__plus_circle
                        }
                    />
                    <img src={resumeIcon} alt="Resume" />
                </div>
                <span className={styles.create_resume_button__text}>
                    Create a resume
                </span>
            </div>
        </div>
    );
};

export { CreateResumeButton };
