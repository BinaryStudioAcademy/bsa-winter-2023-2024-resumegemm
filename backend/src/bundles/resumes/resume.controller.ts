import {
    type IdParameter,
    HTTPError,
    ResumesApiPath,
} from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type IResumeService } from './interfaces/resume-service.interface.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeViewsCountResponseDto,
} from './types/types.js';

class ResumeController extends Controller {
    private resumeService: IResumeService;

    public constructor(logger: ILogger, resumeService: IResumeService) {
        super(logger, ApiPath.RESUMES);

        this.resumeService = resumeService;

        this.addRoute({
            path: ResumesApiPath.ROOT,
            method: 'POST',
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: ResumeCreateItemRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findByIdWithRelations(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: IdParameter }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        params: IdParameter;
                        body: ResumeUpdateItemRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.USER_ID,
            method: 'GET',
            handler: (options) =>
                this.findAllByUserId(
                    options as ApiHandlerOptions<{
                        params: { userId: string };
                    }>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.SCORE,
            method: 'POST',
            handler: (options) =>
                this.giveResumeScore(
                    options as ApiHandlerOptions<{
                        body: ResumeAiScoreRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.USER_ID_VIEWS(),
            method: 'GET',
            handler: (options) =>
                this.getResumeViews(
                    options as ApiHandlerOptions<{
                        params: { userId: string };
                    }>,
                ),
        });
    }

    private async create(
        options: ApiHandlerOptions<{
            body: ResumeCreateItemRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<ResumeGetItemResponseDto>> {
        const resume = await this.resumeService.create(options.body);

        return {
            status: HttpCode.CREATED,
            payload: resume,
        };
    }

    private async findAll(): Promise<
        ApiHandlerResponse<ResumeGetAllResponseDto>
    > {
        const resumes = await this.resumeService.findAll();

        return {
            status: HttpCode.OK,
            payload: resumes,
        };
    }

    private async findByIdWithRelations(
        options: ApiHandlerOptions<{ params: IdParameter }>,
    ): Promise<ApiHandlerResponse<ResumeGetItemResponseDto>> {
        const resume = await this.resumeService.findWithRelations(
            options.params.id,
        );

        if (!resume) {
            throw new HTTPError({
                status: HttpCode.BAD_REQUEST,
                message: `Resume with id ${options.params.id} not found`,
            });
        }

        return {
            status: HttpCode.OK,
            payload: resume,
        };
    }

    private async delete(
        options: ApiHandlerOptions<{ params: IdParameter }>,
    ): Promise<ApiHandlerResponse<boolean>> {
        const isDeleted = await this.resumeService.delete(options.params.id);

        return {
            status: HttpCode.OK,
            payload: isDeleted,
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            params: IdParameter;
            body: ResumeUpdateItemRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<ResumeGetItemResponseDto>> {
        const resume = await this.resumeService.find(options.params.id);

        if (!resume) {
            throw new HTTPError({
                status: HttpCode.BAD_REQUEST,
                message: `Resume with id ${options.params.id} not found`,
            });
        }

        const newResume = await this.resumeService.update(
            options.params.id,
            options.body,
        );

        return {
            status: HttpCode.OK,
            payload: newResume,
        };
    }

    private async findAllByUserId(
        options: ApiHandlerOptions<{ params: { userId: string } }>,
    ): Promise<ApiHandlerResponse<ResumeGetAllResponseDto>> {
        const resumes = await this.resumeService.findAllByUserId(
            options.params.userId,
        );

        return {
            status: HttpCode.OK,
            payload: resumes,
        };
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

    private async getResumeViews(
        options: ApiHandlerOptions<{ params: { userId: string } }>,
    ): Promise<ApiHandlerResponse<ResumeViewsCountResponseDto[]>> {
        const views = await this.resumeService.getResumeViews(
            options.params.userId,
        );
        return {
            status: HttpCode.OK,
            payload: views,
        };
    }
}

export { ResumeController };
