import { compareDatesWithoutTime } from './compare-date-without-time.js';

function compareDateInDiapasonWithoutTime(
    compareDate: Date,
    dateStart: Date,
    dateEnd: Date,
): boolean {
    return (
        compareDatesWithoutTime(compareDate, dateStart) ||
        (dateStart < compareDate && compareDate < dateEnd) ||
        compareDatesWithoutTime(compareDate, dateEnd)
    );
}

export { compareDateInDiapasonWithoutTime };
