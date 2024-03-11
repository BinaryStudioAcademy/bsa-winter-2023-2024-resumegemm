import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { StatisticsApiPath } from './enums/enums.js';
import { type StatisticsService } from './statistics.service.js';
import {
    type GetStatisticsRequestDto,
    type GetStatisticsResponseDto,
} from './types/types.js';

class StatisticsController extends Controller {
    private statisticsService: StatisticsService;

    public constructor(logger: ILogger, statisticsService: StatisticsService) {
        super(logger, ApiPath.STATISTICS);

        this.statisticsService = statisticsService;

        this.addRoute({
            path: StatisticsApiPath.QUERY,
            method: 'POST',
            handler: (options) =>
                this.getStatistics(
                    options as ApiHandlerOptions<{
                        body: GetStatisticsRequestDto;
                    }>,
                ),
        });
    }

    private async getStatistics(
        options: ApiHandlerOptions<{
            body: GetStatisticsRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<GetStatisticsResponseDto | undefined>> {
        const { resumeIds, period } = options.body;

        const data = await this.statisticsService.getStatistics(
            resumeIds,
            period,
        );

        return {
            status: HttpCode.CREATED,
            payload: data,
        };
    }
}

export { StatisticsController };
