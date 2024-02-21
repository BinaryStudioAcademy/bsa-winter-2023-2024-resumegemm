import { DescriptionItem } from '~/bundles/resume-preview/components/components';
import {
    type SummaryData,
    type SummaryStyles,
} from '~/bundles/resume-preview/types/types';

import { Badge } from '../components';
import styles from './styles.module.scss';

type Properties = {
    data: SummaryData;
    json_styles: SummaryStyles;
};

const Summary: React.FC<Properties> = ({ data, json_styles }) => (
    <div className={styles.resume_preview__section_wrapper}>
        <div className={styles.resume_preview__main_section_header}>
            <h3 className={styles.section_header__title}>Summary</h3>
            <Badge title="about me" />
        </div>
        <ul className={styles.section_description__list}>
            {data.data.map((item, index) => (
                <DescriptionItem
                    key={index}
                    description={data.data[index]}
                    styles={json_styles.summary__description_item}
                />
            ))}
        </ul>
    </div>
);

export { Summary };
