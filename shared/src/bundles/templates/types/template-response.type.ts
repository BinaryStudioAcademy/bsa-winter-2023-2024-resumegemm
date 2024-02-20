import { type TemplateBlockSettings } from './template-block-settings.type.js';

type TemplateResponse = {
    id: string;
    isOwner: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type TemplateResponse };