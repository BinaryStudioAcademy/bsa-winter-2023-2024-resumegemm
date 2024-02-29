import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    src: string;
    label: string;
    className?: string;
};

const FeatureImage: React.FC<Properties> = ({ src, label, className = '' }) => {
    return (
        <div className={clsx(styles.feature_image__container, className)}>
            <div className={styles.feature_image__image_container}>
                <img className={styles.feature_image} src={src} alt="feature" />
            </div>

            <div className={styles.feature_image__text_container}>
                <p className={styles.feature_image__text}>{label}</p>
            </div>
        </div>
    );
};

export { FeatureImage };
