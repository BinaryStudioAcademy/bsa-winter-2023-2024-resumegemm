import { type DateDto } from '~/bundles/common/types/calendar/calendar-date.dto';
import { type CalendarMonth } from '~/bundles/common/types/types';

const yearRegex = /\d{4}/g;
const monthRegex = /[A-Za-z]+/;

const DEFAULT_DATE_PAYLOAD: DateDto = {
    present: false,
    month: null,
    year: new Date().getFullYear()
};

const CalendarMonths: CalendarMonth[] = [
    { num: 1, name: 'Jan' },
    { num: 2, name: 'Feb' },
    { num: 3, name: 'Mar' },
    { num: 4, name: 'Apr' },
    { num: 5, name: 'May' },
    { num: 6, name: 'Jun' },
    { num: 7, name: 'Jul' },
    { num: 8, name: 'Aug' },
    { num: 9, name: 'Sep' },
    { num: 10, name: 'Oct' },
    { num: 11, name: 'Nov' },
    { num: 12, name: 'Dec' }
];

export { 
    CalendarMonths,
    DEFAULT_DATE_PAYLOAD,
    monthRegex,
    yearRegex };
