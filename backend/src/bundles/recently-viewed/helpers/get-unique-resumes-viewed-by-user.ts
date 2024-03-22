import {
    type getResumesViewedByUserQueryResult,
    type RecentlyViewedResumesResponseDto,
} from '../types/types';

const getUniqueResumesViewedByUser = (
    recentlyViewed: getResumesViewedByUserQueryResult[],
): RecentlyViewedResumesResponseDto[] => {
    const uniqueResumesIds = new Set<string>();
    const recentlyViewedUniqueResumes: RecentlyViewedResumesResponseDto[] = [];

    for (const item of recentlyViewed) {
        if (!uniqueResumesIds.has(item.resumeId)) {
            uniqueResumesIds.add(item.resumeId);
            recentlyViewedUniqueResumes.push({
                id: item.id,
                userId: item.userId,
                resumeId: item.resumeId,
                templateId: item.templateId,
                resumes: item.resumes,
                viewedAt: item.viewedAt,
            });
        }
    }

    return recentlyViewedUniqueResumes;
};

export { getUniqueResumesViewedByUser };
