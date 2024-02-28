import React, { useCallback } from 'react';

import { Calendar } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { type CalendarDate } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

type DateSelectorProperties = {
    name: string;
    onChange: (name: string, date: CalendarDate) => void;
};

const DateSelector: React.FC<DateSelectorProperties> = ({ name, onChange }) => {
    const handleDateChange = useCallback(
        (date: CalendarDate): void => {
            onChange(name, date);
        },
        [name, onChange],
    );

    return (
        <FormGroup label={name}>
            <Calendar
                className={styles.custom__section__calendar}
                onChange={handleDateChange}
            />
        </FormGroup>
    );
};

export { DateSelector };
