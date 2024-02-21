import { type TemplateBlockSettings } from './template-block-settings.type.js';

type TemplateDto = {
    id: string;
    isOwner: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type TemplateDto };
