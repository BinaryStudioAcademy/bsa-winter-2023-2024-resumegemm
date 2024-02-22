import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';
import { Controller } from '~/common/controller/controller.package.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type ResumeService } from './resume.service.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
} from './types/types.js';

class ResumeController extends Controller {
    private resumeService: ResumeService;

    public constructor(logger: ILogger, resumeService: ResumeService) {
        super(logger, '/resume-score');
        this.resumeService = resumeService;

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
        const score = await this.resumeService.giveResumeScore({ file });
        return {
            status: 200,
            payload: score,
        };
    }
}

export { ResumeController };
