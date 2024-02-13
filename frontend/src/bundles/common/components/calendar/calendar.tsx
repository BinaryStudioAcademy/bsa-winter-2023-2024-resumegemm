import clsx from 'clsx';
import { type ChangeEvent,useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import { useAppForm, useFormController } from '../../hooks/hooks';
import { type CalendarDate, type CalendarMonth } from '../../types/types';
import { Toggle } from '../components';
import { CalendarMonths, DEFAULT_DATE_PAYLOAD, monthRegex,yearRegex } from './constants/calendar.constants';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    showPresent?: boolean;
    className?: string
};

const Calendar = <T extends FieldValues>({
    showPresent = false,
    className = '',
    name,
    control
}: Properties<T>): JSX.Element => {
    const { control: innerControl } = useAppForm<CalendarDate>({
        defaultValues: DEFAULT_DATE_PAYLOAD,
    });

    const { field } = useFormController({ name, control });

    const { field: presentField } = useFormController({ name: 'present', control: innerControl });

    const reference = useRef<HTMLDivElement>(null);

    const [text, setText] = useState('');

    const handleTextChange = useCallback((error: ChangeEvent<HTMLInputElement>): void => {
        setText(error.target.value);

        const year = error.target.value.match(yearRegex);
        if (year) {
            setYear(Number(year[0]));
        }

        const monthMatch = error.target.value.match(monthRegex);

        if (monthMatch) {
            for(const month of CalendarMonths) {
                if (
                    monthMatch[0]
                        .toLowerCase()
                        .includes(month.name.toLowerCase()) ||
                    month.name
                        .toLowerCase()
                        .startsWith(monthMatch[0].toLowerCase())
                ) {
                    setMonth(month);
                    setSelected(month.num);
                }
            }
        } else {
            setMonth(null);
            setSelected(0);
        }
    }, []);

    const [focused, setFocused] = useState(false);

    const handleInputFocus = useCallback((focused: boolean) => 
        clsx(styles.calendar__date_input, styles.focused, focused && styles.calendar__date_input)
    , []);

    const setCurrentlyFocused = useCallback((): void => setFocused(true), []);
    const setUnfocused = useCallback((): void => setFocused(false), []);

    const [selected, setSelected] = useState<number | null>(null);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState<CalendarMonth | null>(null);

    const increaseYear = useCallback((): void => setYear(year + 1), [year]);
    const decreaseYear = useCallback((): void => setYear(year - 1), [year]);

    const selectMonth = useCallback((value: Date): void => {
        const inputMonth = CalendarMonths.find((month) => month.num === value.getMonth());
        if(inputMonth) {
            setMonth(inputMonth);
            setSelected(inputMonth.num);
        }
    }, []);

    const handleMonthSelect = useCallback(({ date }: { date: Date }) => 
        clsx(styles.date_picker__option, date.getMonth() === month?.num && styles.date_picker__selected)
    , [month]);

    const handleYearSelected = useCallback((selected: number | null) => 
        clsx(styles.date_picker__option, styles.date_picker__option_year, selected === null && styles.date_picker__selected)
    , []);
    
    const selectYear = useCallback((): void => {
        setMonth(null);
        setSelected(null);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (reference.current && !reference.current.contains(event.target as Node)) {
                setUnfocused();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [setUnfocused]);

    const setMonthYearAsText = useCallback((): void => {
        if (presentField.value) {
            setText('Present');
        } else {
            setText(month ? `${month.name}, ${year}` : String(year));
        }
    }, [month, year, presentField]);

    useEffect(() => {

        field.onChange({
            year: year,
            month: month,
            present: presentField.value
        });

        setMonthYearAsText();
    }, [month, year, presentField, setMonthYearAsText, field]);

    return (
        <div className={clsx(styles.calendar__container, className)} ref={reference}>
            <input
                placeholder="MM/YYYY"
                value={text}
                onChange={handleTextChange}
                type="text"
                className={handleInputFocus(focused)}
                onFocus={setCurrentlyFocused}
            />
            {focused && (
                <div className={styles.calendar__date_picker}>
                    <div className={styles.date_picker__header}>
                        <svg
                            onClick={decreaseYear}
                            className={styles.date_picker__header_arrow_reversed}
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
                        </svg>

                        <button
                                className={handleYearSelected(selected)}
                                onClick={selectYear}
                                onKeyDown={selectYear}
                            >
                            {year}
                        </button>

                        <svg
                            type="button"
                            onClick={increaseYear} 
                            className={styles.date_picker__header_arrow}
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
                        </svg>
                    </div>

                    <ReactCalendar defaultView="year" minDetail='year' maxDetail='year' 
                        tileClassName={handleMonthSelect} 
                        onClickMonth={selectMonth} 
                        showNavigation={false}
                    />

                    {showPresent && (
                        <div className={styles.date_picker__present}>
                            <Toggle type='switch' label='Present' name='present' control={innerControl} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { Calendar };
