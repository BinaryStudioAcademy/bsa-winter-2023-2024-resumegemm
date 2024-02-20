import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';
import { Controller } from '~/common/controller/controller.package.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type ResumeScoreService } from './resume-score.service.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
} from './types/types';

class ResumeScoreController extends Controller {
    private resumeScoreService: ResumeScoreService;

    public constructor(
        logger: ILogger,
        resumeScoreService: ResumeScoreService,
    ) {
        super(logger, '/resume-score');
        this.resumeScoreService = resumeScoreService;

        this.addRoute({
            path: '/score',
            method: 'POST',
            handler: (options) =>
                this.giveResumeScore(
                    options as ApiHandlerOptions<{
                        body: ResumeAiScoreRequestDto;
                    }>,
                ),
        });
    }

    private async giveResumeScore(
        options: ApiHandlerOptions<{
            body: ResumeAiScoreRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<ResumeAiScoreResponseDto>> {
        const { file } = options.body;
        const score = await this.resumeScoreService.giveResumeScore({ file });
        return {
            status: 200,
            payload: score,
        };
    }
}

export { ResumeScoreController };
