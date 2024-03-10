import {
    type StatisticsRecord,
    compareDatesWithoutTime,
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

        const dateWeekAgo = new Date();
        dateWeekAgo.setDate(dateWeekAgo.getDate() - 7);

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
        };
    }

    public async getStatistics(
        resumeId: string[],
    ): Promise<GetStatisticsResponseDto | undefined> {
        const details = await Promise.all(
            resumeId.map(
                async (id) =>
                    await this.resumeShareService.getShareLinkDetails(id),
            ),
        );

        return this.getStatisticsHandleWeek(details);
    }
}

export { StatisticsService };
