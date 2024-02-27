import { Prompts } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import {
    type IResumeRepository,
    type IResumeService,
} from './interfaces/interfaces.js';
import {
    type Resume,
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeUpdateItemRequestDto,
} from './types/types.js';

class ResumeService implements IResumeService<Resume> {
    private resumeRepository: IResumeRepository;
    private openAIService: OpenAIService;

    public constructor(
        resumeRepository: IResumeRepository,
        openAIService: OpenAIService,
    ) {
        this.openAIService = openAIService;
        this.resumeRepository = resumeRepository;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findAll(): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAll();
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAllByUserId(userId);
    }

    public async create(payload: ResumeCreateItemRequestDto): Promise<Resume> {
        return await this.resumeRepository.create(payload);
    }

    public async update(
        id: string,
        data: ResumeUpdateItemRequestDto,
    ): Promise<Resume> {
        return await this.resumeRepository.update(id, data);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.resumeRepository.delete(id);
    }

    public async giveResumeScore({
        resume,
    }: ResumeAiScoreRequestDto): Promise<ResumeAiScoreResponseDto> {
        return await this.openAIService.generateResponse<ResumeAiScoreResponseDto>(
            Prompts.RESUME_SCORE,
            resume,
        );
    }
}

export { ResumeService };
