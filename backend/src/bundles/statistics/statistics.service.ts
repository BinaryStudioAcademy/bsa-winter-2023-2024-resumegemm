import {
    type StatisticsRecord,
    compareDateInDiapasonWithoutTime,
    compareDatesWithoutTime,
    StatisticsPeriods,
} from 'shared/build/index.js';

import { type ResumeShareService } from '../resume-share/resume-share.service.js';
import { StatisticsDays } from './enums/statistics-days.enum.js';
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

        const dateWeekAgo = new Date();
        dateWeekAgo.setDate(dateWeekAgo.getDate() - StatisticsDays.WEEK);

        for (const resume of data) {
            for (
                const day = dateWeekAgo;
                day <= new Date();
                day.setDate(day.getDate() + 1)
            ) {
                statistics.push([
                    day.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    }),
                    resume.accesses.filter((access) => {
                        return compareDatesWithoutTime(
                            new Date(access.resumeShareAccessTime),
                            day,
                        );
                    }).length,
                ]);
            }
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

        const dateMonthAgo = new Date();
        dateMonthAgo.setMonth(dateMonthAgo.getMonth() - StatisticsDays.MONTH);

        for (const resume of data) {
            for (
                const day = dateMonthAgo;
                day <= new Date();
                day.setDate(day.getDate() + StatisticsDays.WEEK)
            ) {
                const dayInWeek = new Date(day);
                dayInWeek.setDate(
                    dayInWeek.getDate() + StatisticsDays.WEEK - 1,
                );

                const dayLimit = new Date(
                    Math.min(dayInWeek.getTime(), Date.now()),
                );

                statistics.push([
                    `${day.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })} - ${dayLimit.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })}`,
                    resume.accesses.filter((access) => {
                        return compareDateInDiapasonWithoutTime(
                            new Date(access.resumeShareAccessTime),
                            day,
                            dayLimit,
                        );
                    }).length,
                ]);
            }
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
                return {
                    data: [['Total', 100]],
                    sum: 100,
                };
            }
        }
    }
}

export { StatisticsService };
