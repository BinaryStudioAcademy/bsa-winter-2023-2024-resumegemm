import { svg } from '~/assets/img/resume-preview/resume-svg';
import { type RecommendationItemData } from '~/bundles/resume-preview/types/types';

import styles from './styles.module.scss';

type Properties = {
    item: RecommendationItemData;
};

const RecommendationItem: React.FC<Properties> = ({ item }) => (
    <li className={styles.section_body__item_recommendation}>
        <div className={styles.recommendation__header}>
            <div className={styles.section_body__image}>
                <img
                    src={item.photo.length > 0 ? item.photo : svg.emptyPhoto}
                    alt="Company Logo"
                />
            </div>
            <div className={styles.section_body__recommendations_info}>
                <h4 className={styles.recommendations_info__name}>
                    {item.name}
                </h4>
                <div className={styles.recommendations_info__work_wrapper}>
                    <p>
                        {item.job_position} {item.company}
                    </p>
                </div>
            </div>
        </div>
        <p className={styles.recommendations_text}>{item.description}</p>
    </li>
);

export { RecommendationItem };
