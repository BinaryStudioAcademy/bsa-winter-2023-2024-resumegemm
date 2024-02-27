import { ApiPath, HttpCode } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.package.js';
import { type ILogger } from '~/common/logger/logger.js';

import { ResumeApiPath } from './enums/enums.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeService as TResumeService,
} from './types/types.js';

class ResumeController extends Controller {
    private resumeService: TResumeService;

    public constructor(logger: ILogger, resumeService: TResumeService) {
        super(logger, ApiPath.RESUMES);
        this.resumeService = resumeService;

        this.addRoute({
            path: ResumeApiPath.SCORE,
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
        const score = await this.resumeService.giveResumeScore(options.body);
        return {
            status: HttpCode.OK,
            payload: score,
        };
    }
}

export { ResumeController };