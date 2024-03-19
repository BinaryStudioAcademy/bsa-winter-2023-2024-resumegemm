import { isAfter, isBefore, isSameDay } from 'date-fns';

function dateWithinRange(
    compareDate: Date,
    dateStart: Date,
    dateEnd: Date,
): boolean {
    return (
        isSameDay(compareDate, dateStart) ||
        (isAfter(compareDate, dateStart) && isBefore(compareDate, dateEnd)) ||
        isSameDay(compareDate, dateEnd)
    );
}

export { dateWithinRange };
