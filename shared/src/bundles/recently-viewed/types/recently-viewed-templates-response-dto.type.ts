import { type TemplateDto } from '~/bundles/templates/templates';

type RecentlyViewedTemplatesResponseDto = {
    id: string;
    userId: string;
    resumeId: string;
    resumeTitle: string;
    templateId: string;
    viewedAt: string;
    template: TemplateDto;
};

export { type RecentlyViewedTemplatesResponseDto };
