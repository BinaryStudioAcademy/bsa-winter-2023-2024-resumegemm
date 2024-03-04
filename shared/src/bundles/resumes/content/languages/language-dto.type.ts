import { type LanguageLevels } from './language-levels.enum.js';

type Language = {
    id: string;
    resumeId: string;
    language: string;
    level: LanguageLevels;
    createdAt: string;
    updatedAt: string;
};

export { type Language };
