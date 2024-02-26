import { type TemplateBlockSettings } from './types';

type Template = {
    id: string;
    isOwner: boolean;
    userId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    templateSettings: TemplateBlockSettings;
};

export { type Template };
