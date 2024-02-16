import clsx from 'clsx';

import {
    type SkillsData,
    type SkillsStyles,
} from '~/bundles/resume-preview/types/types';

import { Badge, DescriptionItem } from '../components';
import styles from './styles.module.scss';

type Properties = {
    data: SkillsData;
    json_styles: SkillsStyles;
};

const Design: React.FC<Properties> = ({ data, json_styles }) => (
    <div className={styles.resume_preview__section_wrapper}>
        <div className={styles.resume_preview__aside_section_header}>
            <h3 className={styles.section_header__title}>Design</h3>
            <Badge title="skills" />
        </div>
        <ul
            className={clsx(
                styles.section_description__list,
                styles.skills__list,
            )}
        >
            {data.data.map((item, index) => (
                <DescriptionItem
                    key={index}
                    description={item}
                    styles={json_styles.skills__description_item}
                />
            ))}
        </ul>
    </div>
);

export { Design };
