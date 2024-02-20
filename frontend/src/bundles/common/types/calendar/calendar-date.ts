import { type CalendarMonth } from './calendar-month';

type CalendarDate = {
    present: boolean;
    month: CalendarMonth | null;
    year: number | null;
};

export { type CalendarDate };
