import {
    type LanguagesData,
    type LanguagesStyles,
} from '~/bundles/resume-preview/types/types';

import styles from './styles.module.scss';

type Properties = {
    data: LanguagesData;
    json_styles: LanguagesStyles;
};

const Languages: React.FC<Properties> = ({ data, json_styles }) => {
    return (
        <div className={styles.resume_preview__section_wrapper}>
            <div className={styles.resume_preview__aside_section_header}>
                <h3 className={styles.section_header__title}>Languages</h3>
            </div>
            <ul className={styles.languages__list}>
                {data.data.map((item, index) => (
                    <li key={index}>
                        <span style={json_styles.languages__title}>
                            {item.language}
                        </span>{' '}
                        <span>-</span>{' '}
                        <span style={json_styles.languages__level}>
                            {item.level}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Languages };
