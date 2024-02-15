import {
    type EducationData,
    type EducationStyles,
} from '~/bundles/resume-preview/types/types';

import styles from './styles.module.scss';

interface EducationProperties {
    data: EducationData;
    json_styles: EducationStyles;
}

const Education: React.FC<EducationProperties> = ({ data, json_styles }) => {
    return (
        <div className={styles.resume_preview__section_wrapper}>
            <div className={styles.resume_preview__aside_section_header}>
                <h3 className={styles.section_header__title}>Education</h3>
            </div>
            <div>
                <h3 className={styles.education__subtitle}>Your Major</h3>
                <div>
                    <span style={json_styles.education__school}>
                        {data.school}
                    </span>{' '}
                    -{' '}
                    <span style={json_styles.education__location}>
                        {data.location}
                    </span>
                </div>
                <div>
                    <span style={json_styles.education__years}>
                        {data.start_year}
                    </span>{' '}
                    -{' '}
                    <span style={json_styles.education__years}>
                        {data.end_year}
                    </span>{' '}
                    -{' '}
                    <span style={json_styles.education__degree}>
                        {data.degree}
                    </span>
                </div>
            </div>
        </div>
    );
};

export { Education };
