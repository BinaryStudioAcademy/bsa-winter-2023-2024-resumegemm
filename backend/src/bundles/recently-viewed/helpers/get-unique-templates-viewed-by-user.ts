import {
    type RecentlyViewedTemplatesQueryResult,
    type RecentlyViewedTemplatesResponseDto,
} from '../types/types';

const getUniqueTemplatesViewedByUser = (
    recentlyViewed: RecentlyViewedTemplatesQueryResult[],
): RecentlyViewedTemplatesResponseDto[] => {
    const uniqueTemplateIds = new Set<string>();
    const recentlyViewedUniqueTemplates: RecentlyViewedTemplatesResponseDto[] =
        [];

    for (const item of recentlyViewed) {
        if (!uniqueTemplateIds.has(item.templateId)) {
            uniqueTemplateIds.add(item.templateId);
            recentlyViewedUniqueTemplates.push({
                id: item.id,
                userId: item.userId,
                resumeId: item.resumeId,
                resumeTitle: item.resumes.resumeTitle,
                templateId: item.templateId,
                template: item.templates,
                viewedAt: item.viewedAt,
            });
        }
    }

    return recentlyViewedUniqueTemplates;
};

export { getUniqueTemplatesViewedByUser };
