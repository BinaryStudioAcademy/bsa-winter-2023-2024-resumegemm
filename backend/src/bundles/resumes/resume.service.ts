import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeWithRelationsAndTemplateResponseDto,
    ExceptionMessage,
    HttpCode,
    HTTPError,
} from 'shared/build/index.js';

import { PROMPTS } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import {
    type IResumeRepository,
    type IResumeService,
} from './interfaces/interfaces.js';
import { type Resume } from './types/types.js';

class ResumeService implements IResumeService {
    private resumeRepository: IResumeRepository;
    private openAIService: OpenAIService;

    public constructor(
        resumeRepository: IResumeRepository,
        openAIService: OpenAIService,
    ) {
        this.resumeRepository = resumeRepository;
        this.openAIService = openAIService;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findById(
        id: string,
    ): Promise<ResumeGetItemResponseDto | null> {
        return this.resumeRepository.findById(id);
    }
    public async getByUserIdTemplateId(
        resumeId: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto> {
        const resume = await this.findById(resumeId);
        if (!resume) {
            throw new HTTPError({
                message: ExceptionMessage.RESUME_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }
        return this.resumeRepository.getByUserIdTemplateId(
            resume.userId,
            resume.templateId,
        );
    }

    public async findAll(): Promise<ResumeGetAllResponseDto[]> {
        return this.resumeRepository.findAll();
    }

    public findAllByUserId(userId: string): Promise<ResumeGetAllResponseDto[]> {
        return this.resumeRepository.findAllByUserId(userId);
    }

    public create(
        payload: ResumeCreateItemRequestDto,
        userId: string,
        templateId: string,
    ): Promise<ResumeGetItemResponseDto> {
        return this.resumeRepository.create(payload, userId, templateId);
    }

    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        return await this.resumeRepository.update(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.resumeRepository.delete(id);
    }

    public async giveResumeScore({
        resume,
    }: ResumeAiScoreRequestDto): Promise<ResumeAiScoreResponseDto> {
        return await this.openAIService.generateResponse<ResumeAiScoreResponseDto>(
            PROMPTS.RESUME_SCORE,
            resume,
        );
    }
}

export { ResumeService };
