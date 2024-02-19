import { type TemplateBlockTitles } from '~/enums/enums';

type TemplateBlockSettings = {
    [key in TemplateBlockTitles]?: {
        enabled: boolean;
    };
};

export { type TemplateBlockSettings };
