import plusCircleIcon from '~/assets/img/plusCircleIcon.svg';
import resumeIcon from '~/assets/img/resumeIcon.svg';

import styles from './styles.module.scss';

const CreateResumeButton: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.createResumeButton}>
                <div className={styles.createResumeButton__icon}>
                    <img
                        src={plusCircleIcon}
                        alt="Create resume"
                        className={styles.createResumeButton__icon__plusCircle}
                    />
                    <img
                        src={resumeIcon}
                        alt="Resume"
                        className={styles.createResumeButton__icon__resume}
                    />
                </div>
                <span className={styles.createResumeButton__text}>
                    Create a resume
                </span>
            </div>
        </div>
    );
};

export { CreateResumeButton };
