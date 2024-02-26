import { type TemplateBlockSettings } from './template-block-settings.type.js';

type TemplateDto = {
    id: string;
    isOwner: boolean;
    userId: string;
    createdAt: string;
    image: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type TemplateDto };
