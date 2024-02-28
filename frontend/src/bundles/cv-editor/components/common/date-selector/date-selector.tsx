import React, { useCallback, useState } from 'react';

import { Calendar } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { type CalendarDate } from '~/bundles/common/types/types';
import { formatDate } from '~/bundles/cv-editor/helpers/format-date/format-date';

import styles from './styles.module.scss';

type DateSelectorProperties = {
    name: string;
    label: string;
    onChange: (name: string, date: string) => void;
};

const DateSelector: React.FC<DateSelectorProperties> = ({
    name,
    label,
    onChange,
}) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = useCallback(
        (date: CalendarDate): void => {
            const formattedDate = formatDate(date);

            if (formattedDate !== selectedDate) {
                setSelectedDate(formattedDate);
                onChange(name, formattedDate);
            }
        },
        [name, onChange, selectedDate],
    );

    return (
        <FormGroup label={label}>
            <Calendar
                className={styles.custom__section__calendar}
                onChange={handleDateChange}
            />
        </FormGroup>
    );
};

export { DateSelector };
