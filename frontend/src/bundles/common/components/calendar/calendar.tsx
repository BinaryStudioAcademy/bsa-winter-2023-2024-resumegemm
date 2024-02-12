import { type ChangeEvent,useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';

import { type CalendarDate, type CalendarMonth } from '../../types/types';
import { CalendarMonthComponent } from './components/calendar-month';
import { monthRegex,yearRegex } from './constants/calendar-regex';
import { CalendarMonths } from './constants/month';
import styles from './styles.module.scss';

type Properties = {
    showPresent?: boolean;
    onDateChange?: ({ present, month, year }: CalendarDate) => void;
};

const Calendar: React.FC<Properties> = ({
    showPresent = false,
    onDateChange,
}: Properties) => {
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

    const setCurrentlyFocused = useCallback((): void => setFocused(true), []);
    const setUnfocused = useCallback((): void => setFocused(false), []);

    const [selected, setSelected] = useState(0);

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState<CalendarMonth | null>(null);

    const increaseYear = useCallback((): void => setYear(year + 1), [year]);
    const decreaseYear = useCallback((): void => setYear(year - 1), [year]);

    const selectMonth = useCallback((month: CalendarMonth): void => {
        setMonth(month);
        setSelected(month.num);
    }, []);

    const [present, setPresent] = useState(false);

    const handlePresentChange = useCallback((): void => {
        setPresent(!present);
    }, [present]);

    const selectYear = useCallback((): void => {
        setMonth(null);
        setSelected(0);
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

    useEffect(() => {
        function setMonthYearAsText(): void {
            if (present) {
                setText('Present');
            } else {
                setText(month ? `${month.name}, ${year}` : String(year));
            }
        }

        setMonthYearAsText();
        if(onDateChange) {
            onDateChange({
                month: month,
                year: year,
                present: present,
            });
        }
    }, [month, year, present, onDateChange]);

    return (
        <div className={styles.calendar__container} ref={reference}>
            <input
                placeholder="MM/YYYY"
                value={text}
                onChange={handleTextChange}
                type="text"
                className={
                    focused
                        ? `${styles['calendar__date-input']} ${styles.focused}`
                        : styles['calendar__date-input']
                }
                onFocus={setCurrentlyFocused}
            />
            {focused && (
                <div className={styles['calendar__date-picker']}>
                    <div className={styles['date-picker__header']}>
                        <svg
                            type="button"
                            onClick={decreaseYear}
                            className={styles['date-picker__header-arrow']}
                            width="24"
                            height="24"
                            style={{ transform: 'scale(-1,1)' }}
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
                        </svg>

                        <button
                            className={
                                selected === 0
                                    ? `${styles['date-picker__option']} ${styles['date-picker__selected']} ${styles['date-picker__option-year']}`
                                    : `${styles['date-picker__option']} ${styles['date-picker__option-year']}`
                            }
                            onClick={selectYear}
                            onKeyDown={selectYear}
                        >
                            {year}
                        </button>

                        <svg
                            onClick={increaseYear}
                            className={styles['date-picker__header-arrow']}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
                        </svg>
                    </div>

                    <div className={styles['date-picker__body']}>
                        {CalendarMonths.map((month) => (
                            <CalendarMonthComponent
                                selected={selected === month.num}
                                key={month.num}
                                month={month}
                                onClick={selectMonth}
                            />
                        ))}
                    </div>

                    {showPresent && (
                        <div className={styles['date-picker__present']}>
                            <input
                            className={styles['date-picker__present-checkbox']}
                                type="checkbox"
                                onChange={handlePresentChange}
                            />
                            <p>Present</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { Calendar };
