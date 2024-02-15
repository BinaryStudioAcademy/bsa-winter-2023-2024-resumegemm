import {
    type TechStackData,
    type TechStackStyles,
} from '~/bundles/resume-preview/types/types';

import { Badge, DescriptionItem } from '../components';
import styles from './styles.module.scss';

interface TechStackDataProperties {
    data: TechStackData;
    json_styles: TechStackStyles;
}

const TechStack: React.FC<TechStackDataProperties> = ({
    data,
    json_styles,
}) => {
    return (
        <div className={styles.resume_preview__section_wrapper}>
            <div className={styles.resume_preview__aside_section_header}>
                <h3 className={styles.section_header__title}>TechStack</h3>
                <Badge title="tech stack" />
            </div>
            <ul className={styles.tech_stack__list}>
                {data.data.map((item, index) => (
                    <DescriptionItem
                        key={index}
                        description={item}
                        styles={json_styles.tech_stack__description_item}
                    />
                ))}
            </ul>
        </div>
    );
};

export { TechStack };
