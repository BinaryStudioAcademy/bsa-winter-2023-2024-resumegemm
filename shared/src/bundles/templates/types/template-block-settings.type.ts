import { type TemplateBlockTitles } from '../enums/enums.js';

type TemplateBlockSettings = {
    [key in TemplateBlockTitles]?: {
        enabled: boolean;
    };
};

export { type TemplateBlockSettings };
