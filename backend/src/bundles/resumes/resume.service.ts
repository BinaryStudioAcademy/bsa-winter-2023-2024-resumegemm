import { validateUrl } from 'shared/build/helpers/validate-url/validate-url.helper.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeViewsCountResponseDto,
    type ResumeWithRelationsAndTemplateResponseDto,
    ContentEncoding,
    ContentType,
} from 'shared/build/index.js';

import { type FileService } from '~/common/files/file.service.js';
import { type FindAllOptions } from '~/common/types/types.js';

import { PROMPTS } from '../open-ai/open-ai.js';
import { type OpenAIService } from '../open-ai/open-ai.service.js';
import { type ResumeShareService } from '../resume-share/resume-share.service.js';
import { type ResumeShareAccessService } from '../resume-share/resume-share-access.service.js';
import { formatDate } from './helpers/format-date.helper.js';
import {
    type IResumeRepository,
    type IResumeService,
} from './interfaces/interfaces.js';
import { type Resume } from './types/types.js';

type ResumeServiceProperties = {
    resumeRepository: IResumeRepository;
    openAIService: OpenAIService;
    fileService: FileService;
    resumeShareService: ResumeShareService;
    resumeShareAccessService: ResumeShareAccessService;
};

class ResumeService implements IResumeService {
    private resumeRepository: IResumeRepository;
    private openAIService: OpenAIService;
    private resumeShareService: ResumeShareService;
    private resumeShareAccessService: ResumeShareAccessService;
    private fileService: FileService;

    public constructor({
        resumeRepository,
        openAIService,
        resumeShareService,
        resumeShareAccessService,
        fileService,
    }: ResumeServiceProperties) {
        this.resumeRepository = resumeRepository;
        this.openAIService = openAIService;
        this.resumeShareService = resumeShareService;
        this.resumeShareAccessService = resumeShareAccessService;
        this.fileService = fileService;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null> {
        return await this.resumeRepository.findById(id);
    }

    public async getResumeWithImage(
        resume: ResumeGetAllResponseDto,
    ): Promise<ResumeGetAllResponseDto> {
        const isValidImageUrl = validateUrl(resume.image);

        if (isValidImageUrl) {
            return resume;
        }

        const imageUrl = await this.fileService.getFileUrl(resume.image);

        return { ...resume, image: imageUrl };
    }

    public async findAll(
        options?: FindAllOptions,
    ): Promise<ResumeGetAllResponseDto[]> {
        const resumes = await this.resumeRepository.findAll(options);
        return Promise.all(
            resumes.map((resume) => this.getResumeWithImage(resume)),
        );
    }

    public findAllByUserId(userId: string): Promise<ResumeGetAllResponseDto[]> {
        return this.resumeRepository.findAllByUserId(userId);
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
        userId: string,
        templateId: string,
    ): Promise<ResumeGetItemResponseDto> {
        const timeNow = Date.now();

        const uploadedImage = await this.fileService.create({
            buffer: payload.resume.image,
            contentEncoding: ContentEncoding.BASE64,
            contentType: ContentType.IMAGE_JPEG,
            key: `${payload.resume.userId}${timeNow}`,
        });

        payload.resume.image = uploadedImage.key;
        const resume = await this.resumeRepository.create(
            payload,
            userId,
            templateId,
        );
        return this.getResumeWithImage(resume);
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
    ): Promise<ResumeViewsCountResponseDto[]> {
        const resumes =
            await this.resumeRepository.findAllByUserIdWithoutRelations(userId);

        const viewCounts = [];

        for (const resume of resumes) {
            const shareLink =
                await this.resumeShareService.getShareLinkByResumeId(resume.id);

            let viewCount = 0;
            let formattedDate;
            if (resume.updatedAt) {
                formattedDate = formatDate(resume.updatedAt);
            }

            if (shareLink) {
                viewCount = await this.resumeShareAccessService.getAccessCount(
                    shareLink.id,
                );
            }

            const imageUrl = await this.fileService.getFileUrl(resume.image);

            viewCounts.push({
                resumeId: resume.id,
                views: viewCount,
                title: resume.resumeTitle,
                image: imageUrl,
                updatedAt: formattedDate,
            });
        }

        return viewCounts;
    }
}

export { ResumeService };
