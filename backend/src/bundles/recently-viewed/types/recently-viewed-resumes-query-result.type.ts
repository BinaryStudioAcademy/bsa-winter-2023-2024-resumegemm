import { type RecentlyViewedModel } from '../recently-viewed.model';

interface RecentlyViewedResumesQueryResult extends RecentlyViewedModel {
    count: number;
    resumes: {
        id: string;
        resumeTitle: string;
        image: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        templateId: string;
    };
}

export { type RecentlyViewedResumesQueryResult };
