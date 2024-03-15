import { type TemplateBlockSettings } from './types.js';

type Template = {
    id: string;
    name: string;
    isOwner: boolean;
    userId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type Template };
