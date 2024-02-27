import { HttpError, ResumesApiPath } from 'shared/build';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';
import { Controller } from '~/common/controller/controller';
import { ApiPath } from '~/common/enums/enums';
import { HttpCode } from '~/common/http/http';
import { type ILogger } from '~/common/logger/logger';

import { type IResumeService } from './interfaces/interfaces.js';
import {
    type Resume,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeUpdateItemRequestDto,
} from './types/types.js';

class ResumeController extends Controller {
    private resumeService: IResumeService<Resume>;

    public constructor(logger: ILogger, resumeService: IResumeService<Resume>) {
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
            path: ResumesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{ params: { id: string } }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
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
            path: ResumesApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{ params: { id: string } }>,
                ),
        });
        this.addRoute({
            path: ResumesApiPath.ID,
            method: 'PUT',
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                        body: ResumeUpdateItemRequestDto;
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
        }>,
    ): Promise<ApiHandlerResponse<Resume>> {
        const resume = await this.resumeService.create(options.body);

        return {
            status: HttpCode.CREATED,
            payload: resume,
        };
    }

    private async findById(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<Resume>> {
        const resume = await this.resumeService.find(options.params.id);

        if (!resume) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: `Resume with id ${options.params.id} not found`,
            });
        }

        return {
            status: HttpCode.OK,
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

    private async delete(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<boolean>> {
        const isDeleted = await this.resumeService.delete(options.params.id);

        return {
            status: HttpCode.OK,
            payload: isDeleted,
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            params: { id: string };
            body: ResumeUpdateItemRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<Resume>> {
        const resume = await this.resumeService.find(options.params.id);

        if (!resume) {
            throw new HttpError({
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
