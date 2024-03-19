import clsx from 'clsx';
import { useCallback } from 'react';

import { Checkbox } from '~/bundles/common/components/components';

import styles from './styles.module.scss';

type StatisticResumeCardPayload = {
    src: string;
    label: string;
    className?: string;
    onCheck: () => void;
};

const StatisticResumeCard: React.FC<StatisticResumeCardPayload> = ({
    src,
    label,
    className = '',
    onCheck,
}) => {
    const handleCheck = useCallback(() => {
        onCheck();
    }, [onCheck]);

    return (
        <div className={clsx(styles.resume_card__container, className)}>
            <div className={styles.resume_card__image_container}>
                <img className={styles.resume_card} src={src} alt="feature" />
            </div>

            <div className={styles.resume_card__text_container}>
                <p className={styles.resume_card__text}>{label}</p>
            </div>

            <Checkbox
                className={styles.resume_card__checkbox}
                label=""
                name="resume select"
                onChange={handleCheck}
            />
        </div>
    );
};

export { StatisticResumeCard };
