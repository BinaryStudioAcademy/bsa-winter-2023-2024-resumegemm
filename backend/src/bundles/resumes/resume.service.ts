import { validateUrl } from 'shared/build/helpers/validate-url/validate-url.helper.js';
import {
    type ResumeAiScoreRequestDto,
    type ResumeAiScoreResponseDto,
    type ResumeCreateItemRequestDto,
    type ResumeGetAllResponseDto,
    type ResumeGetItemResponseDto,
    type ResumeUpdateItemRequestDto,
    type ResumeWithRelationsAndTemplateResponseDto,
    ContentEncoding,
    ContentType,
} from 'shared/build/index.js';

import { type FileService } from '~/common/files/file.service.js';
import { type FindAllOptions } from '~/common/types/types.js';

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
    private fileService: FileService;

    public constructor(
        resumeRepository: IResumeRepository,
        openAIService: OpenAIService,
        fileService: FileService,
    ) {
        this.resumeRepository = resumeRepository;
        this.openAIService = openAIService;
        this.fileService = fileService;
    }

    public async find(id: string): Promise<Resume | undefined> {
        return await this.resumeRepository.find(id);
    }

    public async findById(
        id: string,
    ): Promise<ResumeWithRelationsAndTemplateResponseDto | null> {
        const resume = await this.resumeRepository.findById(id);

        if (resume) {
            const { image } = await this.getResumeWithImage(resume);

            return { ...resume, image };
        }

        return resume;
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

    public async findAllByUserId(
        userId: string,
    ): Promise<ResumeGetAllResponseDto[]> {
        const resumes = await this.resumeRepository.findAllByUserId(userId);

        return Promise.all(
            resumes.map((resume) => this.getResumeWithImage(resume)),
        );
    }

    private async uploadResumeImage(
        imageBuffer: string,
        uniqueId: string,
    ): Promise<string> {
        const timeNow = Date.now();

        const uploadedImage = await this.fileService.create({
            buffer: imageBuffer,
            contentEncoding: ContentEncoding.BASE64,
            contentType: ContentType.IMAGE_JPEG,
            key: `${uniqueId}${timeNow}`,
        });

        return uploadedImage.key;
    }

    public async create(
        payload: ResumeCreateItemRequestDto,
        userId: string,
        templateId: string,
    ): Promise<ResumeGetItemResponseDto> {
        payload.resume.image = await this.uploadResumeImage(
            payload.resume.image,
            payload.resume.userId,
        );
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
        data.resume.image = await this.uploadResumeImage(
            data.resume.image as string,
            data.resume.templateId as string,
        );

        const updatedResume = await this.resumeRepository.update(id, data);
        return this.getResumeWithImage(updatedResume);
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
