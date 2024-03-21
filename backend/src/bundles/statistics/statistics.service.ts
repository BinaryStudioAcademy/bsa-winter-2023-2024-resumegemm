import {
    addDays,
    addMonths,
    addWeeks,
    format,
    min,
    subDays,
    subMonths,
    subWeeks,
} from 'date-fns';
import {
    type StatisticsRecord,
    StatisticsPeriods,
} from 'shared/build/index.js';

import { type ResumeShareService } from '../resume-share/resume-share.service.js';
import {
    accessesAmountByDate,
    accessesAmountByDateDiapason,
} from './helpers/accesses-amount-by-date.js';
import { calculateViewsSum } from './helpers/calculate-votes-sum.js';
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
        data: Omit<ResumeShareDetailsGetResponseDto, 'resume'>[],
    ): GetStatisticsResponseDto {
        const statistics: StatisticsRecord[] = [];

        const dateWeekAgo = addDays(subWeeks(new Date(), 1), 1);

        const accesses = data.flatMap((resume) => resume.accesses);

        const currentDate = new Date();

        for (let day = dateWeekAgo; day <= currentDate; day = addDays(day, 1)) {
            statistics.push([
                format(day, 'MMM d'),
                accessesAmountByDate(accesses, day),
            ]);
        }

        return {
            data: statistics,
            viewsOverPeriod: calculateViewsSum(statistics),
        };
    }

    private getStatisticsHandleMonth(
        data: Omit<ResumeShareDetailsGetResponseDto, 'resume'>[],
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
                accessesAmountByDateDiapason(accesses, day, dayLimit),
            ]);
        }

        return {
            data: statistics,
            viewsOverPeriod: calculateViewsSum(statistics),
        };
    }

    private getStatisticsHandleTotal(
        data: Omit<ResumeShareDetailsGetResponseDto, 'resume'>[],
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
                accessesAmountByDateDiapason(accesses, day, dayLimit),
            ]);
        }

        return {
            data: statistics,
            viewsOverPeriod: calculateViewsSum(statistics),
        };
    }

    public async getStatistics(
        resumeId: string[],
        period: string,
    ): Promise<Omit<GetStatisticsResponseDto, 'resume'> | undefined> {
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
