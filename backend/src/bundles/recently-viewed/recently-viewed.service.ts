import { type ResumeService } from '../resumes/resume.service';
import { type ResumeGetItemResponseDto } from '../resumes/types/types';
import { type RecentlyViewedRepository } from './recently-viewed.repository';
import {
    type IRecentlyViewedService,
    type RecentlyViewedQuery,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesResponseDto,
    type RecentlyViewedResumesWithCount,
    type RecentlyViewedTemplatesResponseDto,
} from './types/types';

class RecentlyViewedService implements IRecentlyViewedService {
    private recentlyViewedRepository: RecentlyViewedRepository;
    private resumeService: ResumeService;

    public constructor(
        recentViewedRepository: RecentlyViewedRepository,
        resumeService: ResumeService,
    ) {
        this.recentlyViewedRepository = recentViewedRepository;
        this.resumeService = resumeService;
    }

    public async findAll(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        return await this.recentlyViewedRepository.findAll(data);
    }

    public async findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedTemplatesResponseDto[]> {
        return await this.recentlyViewedRepository.findRecentlyViewedTemplatesByUser(
            data,
        );
    }

    public async findRecentlyViewedResumesByUser(data: {
        userId: string;
        options: RecentlyViewedQuery;
    }): Promise<RecentlyViewedResumesResponseDto[]> {
        const recentlyViewedResumesByUser =
            await this.recentlyViewedRepository.findRecentlyViewedResumesByUser(
                data,
            );

        return Promise.all(
            recentlyViewedResumesByUser.map(async (recentlyViewedResume) => {
                const { resumes } = recentlyViewedResume;

                if (resumes) {
                    const { image } =
                        await this.resumeService.getResumeWithImage(
                            resumes as ResumeGetItemResponseDto,
                        );

                    resumes.image = image;
                }

                return recentlyViewedResume;
            }),
        );
    }

    public async create(
        userId: string,
        payload: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {
        const existingRecentlyViewed =
            await this.recentlyViewedRepository.findRecentlyViewedByResumeId(
                userId,
                payload.resumeId,
            );

        if (existingRecentlyViewed) {
            return (await this.update(
                existingRecentlyViewed.id,
            )) as RecentlyViewedResponseDto;
        }

        return await this.recentlyViewedRepository.create(userId, payload);
    }

    public async update(id: string): Promise<RecentlyViewedResponseDto | null> {
        const recentlyViewed = await this.recentlyViewedRepository.find(id);

        if (!recentlyViewed) {
            return null;
        }

        return await this.recentlyViewedRepository.update(id);
    }

    public async delete(id: string): Promise<boolean | null> {
        const recentlyViewed = await this.recentlyViewedRepository.find(id);

        if (!recentlyViewed) {
            return null;
        }

        return await this.recentlyViewedRepository.delete(id);
    }

    public async findRecentlyViewedResumesWithCount(): Promise<
        RecentlyViewedResumesWithCount[]
    > {
        return await this.recentlyViewedRepository.findRecentlyViewedResumesWithCount();
    }
}

export { RecentlyViewedService };
