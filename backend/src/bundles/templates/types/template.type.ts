import { type TemplateBlockSettings } from './types.js';

type Template = {
    id: string;
    isOwner: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type Template };
