import { type CalendarDate } from '~/bundles/common/types/types';

const DAY = '01';

const formatDate = (date: CalendarDate): string => {
    const year = date.year;
    const day = DAY;
    let month;

    if (date.month !== null) {
        month = (date.month.num + 1).toString();
        month = month.length === 1 ? `0${month}` : month;
    }

    return `${year}-${month}-${day}`;
};

export { formatDate };
