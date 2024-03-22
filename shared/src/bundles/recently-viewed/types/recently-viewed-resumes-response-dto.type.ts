import { type Resume } from '~/bundles/resumes/resumes';

type RecentlyViewedResumesResponseDto = {
    id: string;
    userId: string;
    resumeId: string;
    templateId: string;
    viewedAt: string;
    resumes: Resume | null;
};

export { type RecentlyViewedResumesResponseDto };
