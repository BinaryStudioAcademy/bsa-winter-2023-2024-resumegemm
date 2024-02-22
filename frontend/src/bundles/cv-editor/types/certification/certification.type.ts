import { type CalendarDate } from '~/bundles/common/types/types';

type Certification = {
    title: string;
    authority: string;
    url: string;
    description: string;
    startDate: CalendarDate | null;
    endDate: CalendarDate | null;
};

export { type Certification };
