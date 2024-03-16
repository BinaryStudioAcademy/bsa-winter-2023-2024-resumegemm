import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    image: string;
    subtitle?: string;
    viewedResume?: number;
};

const ResumeCard: React.FC<Properties> = ({
    title,
    image,
    subtitle,
    viewedResume,
}: Properties) => {
    return (
        <div className={styles.resume_card}>
            <img src={image} alt="Resume" className={styles.resume_card__img} />
            <div className={styles.resume_card__content}>
                <div className={styles.resume_card__content_title}>
                    {title}
                    {viewedResume !== undefined && (
                        <div
                            className={
                                styles.resume_card__resume_views_container
                            }
                        >
                            <Icon
                                size={IconSize.SMALL}
                                name={IconName.EYE_OPEN}
                            />
                            <span
                                className={
                                    styles.resume_card__resume_views_number
                                }
                            >
                                {viewedResume}
                            </span>
                        </div>
                    )}
                </div>
                {subtitle && (
                    <span className={styles.resume_card__content_text}>
                        {subtitle}
                    </span>
                )}
            </div>
        </div>
    );
};

export { ResumeCard };
