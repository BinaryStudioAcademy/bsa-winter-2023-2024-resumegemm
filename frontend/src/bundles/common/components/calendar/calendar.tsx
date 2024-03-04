import clsx from 'clsx';
import {
    type ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';

import { CalendarTypes } from '../../enums/calendar/calendar-types.enum';
import { useClickOutside } from '../../hooks/use-click-outside/use-click-outside.hook';
import { type InitDate } from '../../types/calendar/init-date.type';
import {
    type CalendarDate,
    type CalendarMonth,
    type ValueOf,
} from '../../types/types';
import { Switch } from '../components';
import {
    CalendarMonths,
    monthRegex,
    yearRegex,
} from './constants/calendar.constants';
import styles from './styles.module.scss';

type Properties = {
    onChange?: (date: CalendarDate) => void;
    type?: ValueOf<typeof CalendarTypes>;
    className?: string;
    initDate?: InitDate;
};

const handleYearInit = (inputYear: number | undefined): number => {
    if (!inputYear) {
        return new Date().getFullYear();
    }

    return inputYear;
};

const handleMonthInit = (
    inputMonth: number | undefined,
): CalendarMonth | null => {
    const month = CalendarMonths.find((month) => month.num === inputMonth);
    if (!month) {
        return null;
    }

    return month;
};

const handlePresentInit = (inputPresent: boolean | undefined): boolean => {
    if (!inputPresent) {
        return false;
    }

    return inputPresent;
};

const Calendar = ({
    type = CalendarTypes.regular,
    className = '',
    initDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        present: false,
    },
    onChange,
}: Properties): JSX.Element => {
    const [selected, setSelected] = useState<number | null>(null);

    const [year, setYear] = useState(handleYearInit(initDate.year));
    const [month, setMonth] = useState<CalendarMonth | null>(
        handleMonthInit(initDate.month),
    );

    const [text, setText] = useState('');

    const [focused, setFocused] = useState(false);

    const [present, setPresent] = useState(handlePresentInit(initDate.present));

    const reference = useRef<HTMLDivElement>(null);

    const handleTextChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            setText(event.target.value);

            const year = event.target.value.match(yearRegex);
            if (year) {
                setYear(Number(year[0]));
            }

            const monthMatch = event.target.value.match(monthRegex);

            if (!monthMatch) {
                setMonth(null);
                setSelected(0);
                return;
            }

            for (const month of CalendarMonths) {
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
        },
        [],
    );

    const handleInputFocus = useCallback(
        (focused: boolean) =>
            clsx(
                styles.calendar__date_input,
                styles.calendar__date_input,
                focused && styles.focused,
            ),
        [],
    );

    const setCurrentlyFocused = useCallback((): void => setFocused(true), []);
    const setUnfocused = useCallback((): void => setFocused(false), []);

    const increaseYear = useCallback((): void => setYear(year + 1), [year]);
    const decreaseYear = useCallback((): void => setYear(year - 1), [year]);

    const selectMonth = useCallback((value: Date): void => {
        const inputMonth = CalendarMonths.find(
            (month) => month.num === value.getMonth(),
        );
        if (inputMonth) {
            setMonth(inputMonth);
            setSelected(inputMonth.num);
        }
    }, []);

    const handleMonthSelect = useCallback(
        ({ date }: { date: Date }) =>
            clsx(
                styles.date_picker__option,
                date.getMonth() === month?.num && styles.date_picker__selected,
            ),
        [month],
    );

    const handleYearSelected = useCallback(
        (selected: number | null) =>
            clsx(
                styles.date_picker__option,
                styles.date_picker__option_year,
                selected === null && styles.date_picker__selected,
            ),
        [],
    );

    const selectYear = useCallback((): void => {
        setMonth(null);
        setSelected(null);
    }, []);

    const setMonthYearAsText = useCallback((): void => {
        if (present) {
            setText('Present');
            return;
        }

        setText(month ? `${month.name}, ${year}` : String(year));
    }, [month, year, present]);

    useClickOutside(reference, setUnfocused);

    useEffect(() => {
        if (onChange) {
            onChange({
                year: year,
                month: month,
                present: present,
            });
        }

        setMonthYearAsText();
    }, [month, year, present, setMonthYearAsText, onChange]);

    return (
        <div
            className={clsx(styles.calendar__container, className)}
            ref={reference}
        >
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
                        <button
                            className={
                                styles.date_picker__header_arrow_container_reversed
                            }
                            onClick={decreaseYear}
                        ></button>

                        <button
                            className={handleYearSelected(selected)}
                            onClick={selectYear}
                            onKeyDown={selectYear}
                        >
                            {year}
                        </button>

                        <button
                            className={
                                styles.date_picker__header_arrow_container
                            }
                            onClick={increaseYear}
                        ></button>
                    </div>

                    <ReactCalendar
                        defaultView="year"
                        minDetail="year"
                        maxDetail="year"
                        tileClassName={handleMonthSelect}
                        onClickMonth={selectMonth}
                        showNavigation={false}
                    />

                    {type === CalendarTypes.withPresent && (
                        <div className={styles.date_picker__present}>
                            <Switch
                                onChange={setPresent}
                                label="Present"
                                checked={present}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { Calendar };
