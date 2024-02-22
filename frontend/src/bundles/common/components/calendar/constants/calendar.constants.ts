
import { type CalendarMonth } from '~/bundles/common/types/types';

const yearRegex = /\d{4}/g;
const monthRegex = /[A-Za-z]+/;

const CalendarMonths: CalendarMonth[] = [
    { num: 0, name: 'Jan' },
    { num: 1, name: 'Feb' },
    { num: 2, name: 'Mar' },
    { num: 3, name: 'Apr' },
    { num: 4, name: 'May' },
    { num: 5, name: 'Jun' },
    { num: 6, name: 'Jul' },
    { num: 7, name: 'Aug' },
    { num: 8, name: 'Sep' },
    { num: 9, name: 'Oct' },
    { num: 10, name: 'Nov' },
    { num: 11, name: 'Dec' }
];

export {
    CalendarMonths,
    monthRegex,
    yearRegex
};
