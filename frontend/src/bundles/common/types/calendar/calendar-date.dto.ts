import { type CalendarMonth } from './calendar.types';

type DateDto = {
    present: boolean;
    month: CalendarMonth | null,
    year: number
};
export { type DateDto };
