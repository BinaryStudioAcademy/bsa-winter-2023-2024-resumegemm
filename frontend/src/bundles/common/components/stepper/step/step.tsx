import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
};

const Step = ({
    label,
    index,
    isActive,
    isCompleted,
}: Properties): JSX.Element => {
    return (
        <div
            className={clsx(styles.step, {
                [styles.step__active]: isActive || isCompleted,
            })}
        >
            <div
                className={clsx(styles.step__index, {
                    [styles.step__index_active]: isActive,
                    [styles.step__index_done]: isCompleted,
                })}
            >
                {!isCompleted && ++index}
            </div>
            <div className={styles.step__label}>{label}</div>
        </div>
    );
};

export { Step };
