import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    src: string;
    label: string;
    className?: string;
};

const StatisticResumeCard: React.FC<Properties> = ({
    src,
    label,
    className = '',
}) => {
    return (
        <div className={clsx(styles.resume_card__container, className)}>
            <div className={styles.resume_card__image_container}>
                <img className={styles.resume_card} src={src} alt="feature" />
            </div>

            <div className={styles.resume_card__text_container}>
                <p className={styles.resume_card__text}>{label}</p>
            </div>
        </div>
    );
};

export { StatisticResumeCard };
