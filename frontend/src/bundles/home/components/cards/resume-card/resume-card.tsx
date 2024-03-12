import styles from './styles.module.scss';

type Properties = {
    title: string;
    image: string;
    subtitle?: string;
};

const ResumeCard: React.FC<Properties> = ({
    title,
    image,
    subtitle,
}: Properties) => (
    <div className={styles.resume_card}>
        <img src={image} alt="Resume" className={styles.resume_card__img} />
        <div className={styles.resume_card__content}>
            <span className={styles.resume_card__content_title}>{title}</span>
            {subtitle && (
                <span className={styles.resume_card__content_text}>
                    {subtitle}
                </span>
            )}
        </div>
    </div>
);

export { ResumeCard };
