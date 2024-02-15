import { svg } from '~/assets/img/resume_preview/resume-svg';

import styles from './styles.module.scss';

interface RecommendationItemProperties {
    item: {
        photo: string;
        name: string;
        job_position: string;
        company: string;
        description: string;
    };
}

const RecommendationItem: React.FC<RecommendationItemProperties> = ({
    item,
}) => (
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
