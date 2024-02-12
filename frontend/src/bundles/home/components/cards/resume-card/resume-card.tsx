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
}: Properties) => {
    return (
        <div className={styles.resumeCard}>
            <img src={image} alt="Resume" className={styles.resumeCard__img} />
            <div className={styles.resumeCard__content}>
                <span className={styles.resumeCard__content__title}>
                    {title}
                </span>
                {subtitle && (
                    <span className={styles.resumeCard__content__text}>
                        {subtitle}
                    </span>
                )}
            </div>
        </div>
    );
};

export { ResumeCard };
