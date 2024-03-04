import { type CalendarDate } from '~/bundles/common/types/calendar/calendar-date.type';

type Education = {
    institutionName: string;
    degree: string;
    city: string;
    country: string;
    description: string;
    startDate: CalendarDate | null;
    endDate: CalendarDate | null;
};

export { type Education };
