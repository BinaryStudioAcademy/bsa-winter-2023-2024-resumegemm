import { useCallback } from 'react';

import { type CalendarMonth } from '~/bundles/common/types/types';

import styles from '../styles.module.scss';

type Properties = {
    month: CalendarMonth
    onClick: (number_: CalendarMonth) => void;
    selected: boolean;
};

const CalendarMonthComponent: React.FC<Properties> = ({
    month,
    onClick,
    selected,
}: Properties) => {
    const handleClick = useCallback((): void => {
        onClick(month);
    }, [onClick, month]);

    return (
        <div
            role="presentation"
            className={
                selected
                    ? `${styles['date-picker__option']} ${styles['date-picker__selected']}`
                    : styles['date-picker__option']
            }
            onClick={handleClick}
            onKeyDown={handleClick}
        >
            {month.name}
        </div>
    );
};

export { CalendarMonthComponent };
