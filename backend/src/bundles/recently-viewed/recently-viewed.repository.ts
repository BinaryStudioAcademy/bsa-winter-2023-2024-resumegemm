import { Guid as guid } from 'guid-typescript';

import { getUniqueTemplatesViewedByUser } from './helpers/get-unique-templates-viewed-by-user.js';
import { type RecentlyViewedModel } from './recently-viewed.model';
import {
    type IRecentlyViewedRepository,
    type RecentlyViewedRequestDto,
    type RecentlyViewedResponseDto,
    type RecentlyViewedResumesResponseDto,
    type RecentlyViewedTemplatesQueryResult,
    type RecentlyViewedTemplatesResponseDto,
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

    public async findAll(data: {
        limit: number;
    }): Promise<RecentlyViewedResponseDto[]> {
        const { limit } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('resumeId')
            .orderBy('viewedAt', 'desc')
            .limit(limit);
    }

    public async findRecentlyViewedResumesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedResumesResponseDto[]> {
        const { limit, userId } = data;

        return await this.recentlyViewedModel
            .query()
            .whereNotNull('resumeId')
            .where('userId', userId)
            .withGraphFetched('[resumes]')
            .orderBy('viewedAt', 'desc')
            .limit(limit);
    }

    public async findRecentlyViewedTemplatesByUser(data: {
        userId: string;
        limit: number;
    }): Promise<RecentlyViewedTemplatesResponseDto[]> {
        const { limit, userId } = data;
        const result = (await this.recentlyViewedModel
            .query()
            .whereNotNull('templateId')
            .where('userId', userId)
            .withGraphFetched('[templates]')
            .withGraphFetched('[resumes]')
            .orderBy('viewedAt', 'desc')
            .limit(limit)) as RecentlyViewedTemplatesQueryResult[];

        return getUniqueTemplatesViewedByUser(result);
    }

    public async create(
        userId: string,
        data: RecentlyViewedRequestDto,
    ): Promise<RecentlyViewedResponseDto> {
        const newRecentlyViewed = { ...data, userId, id: guid.raw() };

        return await this.recentlyViewedModel
            .query()
            .insert(newRecentlyViewed)
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

        return Boolean(deletedItem);
    }
}

export { RecentlyViewedRepository };
