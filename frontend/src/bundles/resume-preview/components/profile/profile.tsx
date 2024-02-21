import clsx from 'clsx';

import data from '../../data/resume-preview.json';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
    const { full_name, job_position, styles: json_styles } = data.profile;
    return (
        <div className={clsx(styles.resume_preview__profile, styles.profile)}>
            <h2 style={json_styles.profile__title}>{full_name}</h2>
            <h3 style={json_styles.profile__job_position}>{job_position}</h3>
        </div>
    );
};

export { Profile };
