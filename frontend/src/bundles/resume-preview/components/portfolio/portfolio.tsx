import { svg } from '~/assets/img/resume-preview/resume-svg';
import {
    type PortfolioData,
    type PortfolioStyles,
} from '~/bundles/resume-preview/types/types';

import { Badge } from '../components';
import styles from './styles.module.scss';

type Properties = {
    data: PortfolioData;
    json_styles: PortfolioStyles;
};

const Portfolio: React.FC<Properties> = ({ data, json_styles }) => {
    return (
        <div className={styles.resume_preview__section_wrapper}>
            <div className={styles.resume_preview__aside_section_header}>
                <h3 className={styles.section_header__title}>Latest Project</h3>
                <Badge title="portfolio" />
            </div>
            <div className={styles.portfolio__content}>
                <div className={styles.portfolio__image}>
                    <img
                        src={data.project_image ?? svg.emptyPortfolioImage}
                        alt="Portfolio"
                    />
                </div>
                <div className={styles.portfolio__info}>
                    <h4
                        className={styles.portfolio__title}
                        style={json_styles.portfolio__title}
                    >
                        {data.title}
                    </h4>
                    <p
                        className={styles.portfolio__description}
                        style={json_styles.portfolio__description}
                    >
                        {data.description}
                    </p>
                </div>
                <div
                    className={styles.portfolio__link}
                    style={json_styles.portfolio__link}
                >
                    <img src={svg.figma} alt="Figma Icon" />
                    <p>Add Figma or Portfolio Link</p>
                </div>
            </div>
        </div>
    );
};

export { Portfolio };
