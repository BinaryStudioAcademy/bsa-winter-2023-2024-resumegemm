import clsx from 'clsx';

import data from '../../data/resume-preview.json';
import { Badge } from '../common/badge/badge';
import { ExperienceItem } from '../components';
import styles from './styles.module.scss';

const Experience: React.FC = () => {
    return (
        <div className={clsx(styles.section__wrapper, styles.experience)}>
            <div className={styles.section__header}>
                <h3 className={styles.section__header_title}>Experience</h3>
                <Badge title="works" />
            </div>
            <ul className={styles.section__body}>
                {data.experience.data.map((item, index) => (
                    <ExperienceItem
                        key={index}
                        item={item}
                        json_styles={data.experience.styles}
                    />
                ))}
            </ul>
        </div>
    );
};

export { Experience };
