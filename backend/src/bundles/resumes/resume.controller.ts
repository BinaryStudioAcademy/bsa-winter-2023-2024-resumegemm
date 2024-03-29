import {
    type IdParameter,
    type UserAuthResponse,
    ExceptionMessage,
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
import { type FindAllOptions } from '~/common/types/types.js';

import { recentlyViewedService } from '../recently-viewed/recently-viewed.js';
import { type IResumeService } from './interfaces/resume-service.interface.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeWithRelationsAndTemplateResponseDto,
} from './types/types.js';

class ResumeController extends Controller {
    private resumeService: IResumeService;

    public constructor(logger: ILogger, resumeService: IResumeService) {
        super(logger, ApiPath.RESUMES);

        this.resumeService = resumeService;

        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'POST',
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: ResumeCreateItemRequestDto;
                        user: UserAuthResponse['user'];
                        params: IdParameter;
                    }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ROOT,
            method: 'GET',
            handler: (options) =>
                this.findAll(
                    options as ApiHandlerOptions<{
                        query: FindAllOptions;
                        user: UserAuthResponse['user'];
                    }>,
                ),
        });

        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findByIdWithRelations(
                    options as ApiHandlerOptions<{
                        params: IdParameter;
                        user: UserAuthResponse['user'];
                    }>,
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
                        user: UserAuthResponse['user'];
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
    }

    private async create(
        options: ApiHandlerOptions<{
            body: ResumeCreateItemRequestDto;
            user: UserAuthResponse['user'];
            params: IdParameter;
        }>,
    ): Promise<ApiHandlerResponse<ResumeGetItemResponseDto>> {
        const { id: userId } = options.user;
        const { id: templateId } = options.params;
        const resume = await this.resumeService.create(
            options.body,
            userId,
            templateId,
        );

        return {
            status: HttpCode.CREATED,
            payload: resume,
        };
    }

    private async findAll(
        options: ApiHandlerOptions<{
            query: FindAllOptions;
            user: UserAuthResponse['user'];
        }>,
    ): Promise<ApiHandlerResponse<ResumeGetAllResponseDto[]>> {
        const userId = options.user.id;
        const resumes = await this.resumeService.findAll(userId, options.query);

        return {
            status: HttpCode.OK,
            payload: resumes,
        };
    }

    private async findByIdWithRelations(
        options: ApiHandlerOptions<{
            params: IdParameter;
            user: UserAuthResponse['user'];
        }>,
    ): Promise<
        ApiHandlerResponse<ResumeWithRelationsAndTemplateResponseDto | null>
    > {
        try {
            const resume = await this.resumeService.findById(options.params.id);

            if (resume) {
                await recentlyViewedService.create(options.user.id, {
                    resumeId: resume.id,
                    templateId: resume.templateId,
                });
            }
            return {
                status: HttpCode.OK,
                payload: resume,
            };
        } catch (error: unknown) {
            const { status = HttpCode.INTERNAL_SERVER_ERROR, message } =
                error as HTTPError;
            return {
                status,
                payload: {
                    status,
                    message,
                },
            };
        }
    }

    private async delete(
        options: ApiHandlerOptions<{ params: IdParameter }>,
    ): Promise<ApiHandlerResponse<null>> {
        const isDeleted = await this.resumeService.delete(options.params.id);
        if (isDeleted) {
            return {
                status: HttpCode.OK,
                payload: null,
            };
        }
        throw new HTTPError({
            message: ExceptionMessage.RESUME_NOT_FOUND,
            status: HttpCode.BAD_REQUEST,
        });
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
        options: ApiHandlerOptions<{ user: UserAuthResponse['user'] }>,
    ): Promise<ApiHandlerResponse<ResumeGetAllResponseDto[]>> {
        const { id } = options.user;

        const resumes = await this.resumeService.findAllByUserId(id);

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
}

export { ResumeController };
