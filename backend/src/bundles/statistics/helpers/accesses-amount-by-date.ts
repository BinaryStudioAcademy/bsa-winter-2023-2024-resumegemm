import { isSameDay } from 'date-fns';
import { type ResumeShareAccessResponseDto } from 'shared/build/bundles/resumes/types/resume-share-access-response-dto.type';

import { compareDateInDiapasonWithoutTime } from './helpers';

function accessesAmountByDate(
    accesses: ResumeShareAccessResponseDto[],
    day: Date,
): number {
    return accesses.filter((access) => {
        return isSameDay(new Date(access.resumeShareAccessTime), day);
    }).length;
}

function accessesAmountByDateDiapason(
    accesses: ResumeShareAccessResponseDto[],
    day: Date,
    endDate: Date,
): number {
    return accesses.filter((access) => {
        return compareDateInDiapasonWithoutTime(
            new Date(access.resumeShareAccessTime),
            day,
            endDate,
        );
    }).length;
}

export { accessesAmountByDate, accessesAmountByDateDiapason };
