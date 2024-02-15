import clsx from 'clsx';
import { type ChangeEvent,useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import ArrowImage from '~/assets/img/arrow.svg';

import { CalendarTypes } from '../../enums/calendar/calendar-types.enum';
import { useAppForm, useFormController } from '../../hooks/hooks';
import { useClickOutside } from '../../hooks/use-click-outside/use-click-outside.hook';
import { type CalendarDate, type CalendarMonth,type ValueOf } from '../../types/types';
import { Toggle } from '../components';
import { CalendarMonths, DEFAULT_DATE_PAYLOAD, monthRegex,yearRegex } from './constants/calendar.constants';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    type?: ValueOf<typeof CalendarTypes>;
    className?: string
};

const Calendar = <T extends FieldValues>({
    type = CalendarTypes.regular,
    className = '',
    name,
    control
}: Properties<T>): JSX.Element => {
    const [selected, setSelected] = useState<number | null>(null);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState<CalendarMonth | null>(null);

    const [text, setText] = useState('');

    const [focused, setFocused] = useState(false);

    const { control: innerControl } = useAppForm<CalendarDate>({
        defaultValues: DEFAULT_DATE_PAYLOAD,
    });

    const { field } = useFormController({ name, control });

    const { field: presentField } = useFormController({ name: 'present', control: innerControl });

    const reference = useRef<HTMLDivElement>(null);

    const handleTextChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);

        const year = event.target.value.match(yearRegex);
        if (year) {
            setYear(Number(year[0]));
        }

        const monthMatch = event.target.value.match(monthRegex);

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

    const handleInputFocus = useCallback((focused: boolean) => 
        clsx(styles.calendar__date_input, styles.focused, focused && styles.calendar__date_input)
    , []);

    const setCurrentlyFocused = useCallback((): void => setFocused(true), []);
    const setUnfocused = useCallback((): void => setFocused(false), []);

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

    const setMonthYearAsText = useCallback((): void => {
        if (presentField.value) {
            setText('Present');
        } else {
            setText(month ? `${month.name}, ${year}` : String(year));
        }
    }, [month, year, presentField]);

    useClickOutside(reference, setUnfocused);

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
                        <button className={styles.date_picker__header_arrow_container} onClick={decreaseYear}>
                            <img alt='arrow' src={ArrowImage} className={styles.date_picker__header_arrow_reversed} />
                        </button>
                        
                        <button
                                className={handleYearSelected(selected)}
                                onClick={selectYear}
                                onKeyDown={selectYear}
                            >
                            {year}
                        </button>

                        <button className={styles.date_picker__header_arrow_container} onClick={increaseYear}>
                            <img alt='arrow' src={ArrowImage} className={styles.date_picker__header_arrow} />
                        </button>
                    </div>

                    <ReactCalendar defaultView="year" minDetail='year' maxDetail='year' 
                        tileClassName={handleMonthSelect} 
                        onClickMonth={selectMonth} 
                        showNavigation={false}
                    />

                    {type === CalendarTypes.withPresent &&
                        <div className={styles.date_picker__present}>
                            <Toggle type='switch' label='Present' name='present' control={innerControl} />
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export { Calendar };
