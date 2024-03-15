import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
} from 'shared/build/index.js';

import { PROMPTS } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import { type ResumeShareService } from '../resume-share/resume-share.service.js';
import { type ResumeShareAccessService } from '../resume-share/resume-share-access.service.js';
import {
    type IResumeRepository,
    type IResumeService,
} from './interfaces/interfaces.js';
import { type Resume } from './types/types.js';

type ResumeServiceProperties = {
    resumeRepository: IResumeRepository;
    openAIService: OpenAIService;
    resumeShareService: ResumeShareService;
    resumeShareAccessService: ResumeShareAccessService;
};

class ResumeService implements IResumeService {
    private resumeRepository: IResumeRepository;
    private openAIService: OpenAIService;
    private resumeShareService: ResumeShareService;
    private resumeShareAccessService: ResumeShareAccessService;

    public constructor({
        resumeRepository,
        openAIService,
        resumeShareService,
        resumeShareAccessService,
    }: ResumeServiceProperties) {
        this.resumeRepository = resumeRepository;
        this.openAIService = openAIService;
        this.resumeShareService = resumeShareService;
        this.resumeShareAccessService = resumeShareAccessService;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findWithRelations(
        id: string,
    ): Promise<ResumeGetItemResponseDto | undefined> {
        return await this.resumeRepository.findWithRelations(id);
    }

    public async findAll(): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAll();
    }

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto> {
        return await this.resumeRepository.findAllByUserId(userId);
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
    ): Promise<ResumeGetItemResponseDto> {
        return await this.resumeRepository.create(payload);
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

    public async getResumeViews(
        userId: string,
    ): Promise<{ resumeId: string; views: number }[]> {
        const resumes =
            await this.resumeRepository.findAllByUserIdWithoutRelations(userId);

        const viewCounts = [];

        for (const resume of resumes) {
            const shareLink =
                await this.resumeShareService.getShareLinkByResumeId(resume.id);

            if (shareLink) {
                const viewCount =
                    await this.resumeShareAccessService.getAccessCount(
                        shareLink.id,
                    );

                viewCounts.push({
                    resumeId: resume.id,
                    views: viewCount,
                });
            }
        }

        return viewCounts;
    }
}

export { ResumeService };
