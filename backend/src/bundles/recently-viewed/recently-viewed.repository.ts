import { type RecentlyViewedModel } from './recently-viewed.model';
import {
    type IRecentlyViewedRepository,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
} from './types/types';

class RecentlyViewedRepository implements IRecentlyViewedRepository {
    private recentlyViewedModel: typeof RecentlyViewedModel;

    public constructor(recentlyViewedModel: typeof RecentlyViewedModel) {
        this.recentlyViewedModel = recentlyViewedModel;
    }

    public async find(id: string): Promise<RecentlyViewedResponseDto | null> {
        const recentlyViewed = await this.recentlyViewedModel
            .query()
            .findById(id);

        return recentlyViewed ?? null;
    }

    public async findRecentlyViewedByUser(data: {
        userId: string;
        templateId?: string;
        resumeId?: string;
    }): Promise<RecentlyViewedResponseDto | null> {
        const { userId, templateId, resumeId } = data;

        let recentlyViewedByUser;

        if (templateId) {
            recentlyViewedByUser = await this.recentlyViewedModel
                .query()
                .where({ user_id: userId, template_id: templateId })
                .first();
        } else if (resumeId) {
            recentlyViewedByUser = await this.recentlyViewedModel
                .query()
                .where({ user_id: userId, resume_id: resumeId })
                .first();
        }

        return recentlyViewedByUser ?? null;
    }

    public async findAll(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        const { limit } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('resumeId')
            .withGraphFetched('[resumes]')
            .withGraphFetched('[resumes, templates]')
            .orderBy('viewedAt', 'desc')
            .limit(limit);

    }
    public async findAllRecentlyViewedResumes(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        const { limit } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('resumeId')
            .withGraphFetched('[resumes]')
            .orderBy('viewedAt', 'desc')
            .limit(limit);
    }

    public async findAllRecentlyViewedTemplates(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        const { limit } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('templateId')
            .withGraphFetched('[templates]')
            .orderBy('viewedAt', 'desc')
            .limit(limit);
    }

    public async create(
        data: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {

        return await this.recentlyViewedModel
            .query()
            .insert(data)
            .returning('*')
            .execute();
    }

    public async update(id: string): Promise<RecentlyViewedResponseDto> {
        const newDate = {
            viewedAt: new Date().toISOString(),
        };

        return await this.recentlyViewedModel
            .query()
            .updateAndFetchById(id, newDate);
    }

    public async delete(id: string): Promise<boolean> {
        const deletedItem = await this.recentlyViewedModel
            .query()
            .deleteById(id);

        return deletedItem ? true : false;
    }
}

export { RecentlyViewedRepository };
