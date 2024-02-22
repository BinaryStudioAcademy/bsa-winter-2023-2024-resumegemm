import data from '~/bundles/resume-preview/data/resume-preview.json';

import { RecommendationItem } from './components/recommendation-item/recommendation-item';
import styles from './styles.module.scss';

const Recommendations: React.FC = () => (
    <div className={styles.main__section_wrapper}>
        <div className={styles.main__section_header}>
            <h3 className={styles.section_header__title}>Recommendations</h3>
        </div>
        <ul className={styles.recommendation__list}>
            {data.recommendations.map((item, index) => (
                <RecommendationItem key={index} item={item} />
            ))}
        </ul>
    </div>
);

export { Recommendations };
