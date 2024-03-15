import {
    addDays,
    addMonths,
    addWeeks,
    format,
    isSameDay,
    min,
    subDays,
    subMonths,
    subWeeks,
} from 'date-fns';
import {
    type StatisticsRecord,
    compareDateInDiapasonWithoutTime,
    StatisticsPeriods,
} from 'shared/build/index.js';

import { type ResumeShareService } from '../resume-share/resume-share.service.js';
import {
    type GetStatisticsResponseDto,
    type ResumeShareDetailsGetResponseDto,
} from './types/types.js';

class StatisticsService {
    private resumeShareService: ResumeShareService;

    public constructor(resumeShareService: ResumeShareService) {
        this.resumeShareService = resumeShareService;
    }

    private getStatisticsHandleWeek(
        data: ResumeShareDetailsGetResponseDto[],
    ): GetStatisticsResponseDto {
        const statistics: StatisticsRecord[] = [];

        const dateWeekAgo = addDays(subWeeks(new Date(), 1), 1);

        const accesses = data.flatMap((resume) => resume.accesses);

        const currentDate = new Date();

        for (let day = dateWeekAgo; day <= currentDate; day = addDays(day, 1)) {
            statistics.push([
                format(day, 'MMM d'),
                accesses.filter((access) => {
                    return isSameDay(
                        new Date(access.resumeShareAccessTime),
                        day,
                    );
                }).length,
            ]);
        }

        return {
            data: statistics,
            sum: statistics.reduce(
                (accumulator, currentValue) => accumulator + currentValue[1],
                0,
            ),
        };
    }

    private getStatisticsHandleMonth(
        data: ResumeShareDetailsGetResponseDto[],
    ): GetStatisticsResponseDto {
        const statistics: StatisticsRecord[] = [];

        const dateMonthAgo = subMonths(new Date(), 1);

        const accesses = data.flatMap((resume) => resume.accesses);

        const currentDate = new Date();

        for (
            let day = dateMonthAgo;
            day <= currentDate;
            day = addWeeks(day, 1)
        ) {
            const dayInAWeek = subDays(addWeeks(day, 1), 1);

            const dayLimit = min([dayInAWeek, new Date()]);

            const stringDate = `${format(day, 'MMM d')} - ${format(
                dayLimit,
                'MMM d',
            )}`;

            statistics.push([
                stringDate,
                accesses.filter((access) => {
                    return compareDateInDiapasonWithoutTime(
                        new Date(access.resumeShareAccessTime),
                        day,
                        dayLimit,
                    );
                }).length,
            ]);
        }

        return {
            data: statistics,
            sum: statistics.reduce(
                (accumulator, currentValue) => accumulator + currentValue[1],
                0,
            ),
        };
    }

    private getStatisticsHandleTotal(
        data: ResumeShareDetailsGetResponseDto[],
    ): GetStatisticsResponseDto {
        const statistics: StatisticsRecord[] = [];

        const accesses = data.flatMap((resume) => resume.accesses);

        const minDate = min(
            accesses.map((access) => new Date(access.resumeShareAccessTime)),
        );

        const currentDate = new Date();

        for (let day = minDate; day <= currentDate; day = addMonths(day, 1)) {
            const dayInMonth = subDays(addMonths(day, 1), 1);

            const dayLimit = min([dayInMonth, new Date()]);

            const stringDate = `${format(day, 'MMM d')} - ${format(
                dayLimit,
                'MMM d',
            )}`;

            statistics.push([
                stringDate,
                accesses.filter((access) => {
                    return compareDateInDiapasonWithoutTime(
                        new Date(access.resumeShareAccessTime),
                        day,
                        dayLimit,
                    );
                }).length,
            ]);
        }

        return {
            data: statistics,
            sum: statistics.reduce(
                (accumulator, currentValue) => accumulator + currentValue[1],
                0,
            ),
        };
    }

    public async getStatistics(
        resumeId: string[],
        period: string,
    ): Promise<GetStatisticsResponseDto | undefined> {
        const details = await Promise.all(
            resumeId.map(
                async (id) =>
                    await this.resumeShareService.getShareLinkDetails(id),
            ),
        );

        switch (period) {
            case StatisticsPeriods.WEEKLY: {
                return this.getStatisticsHandleWeek(details);
            }
            case StatisticsPeriods.MONTHLY: {
                return this.getStatisticsHandleMonth(details);
            }
            case StatisticsPeriods.TOTAL: {
                return this.getStatisticsHandleTotal(details);
            }
        }
    }
}

export { StatisticsService };
