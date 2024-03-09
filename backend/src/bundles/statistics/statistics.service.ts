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

    // private getStatisticsHandleWeek(data: ResumeShareDetailsGetResponseDto): GetStatisticsResponseDto {
    //     for (const d = new Date(2012, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
    //         daysOfYear.push(new Date(d));
    //     }
    //     return
    // }

    // public async getStatistics(
    //     id: string,
    // ): Promise<GetStatisticsResponseDto | unknown> {
    //     const details =
    //         await this.resumeShareService.getShareLinkDetails(id);
    // }
}

export { StatisticsService };
