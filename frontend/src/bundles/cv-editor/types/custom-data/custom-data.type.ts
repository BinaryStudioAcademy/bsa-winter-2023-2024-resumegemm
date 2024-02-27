import { type CalendarDate } from '~/bundles/common/types/calendar/calendar-date';

type CustomData = {
    activityName: string;
    city: string;
    startDate: CalendarDate | null;
    endDate: CalendarDate | null;
    description: string;
};

export { type CustomData };
