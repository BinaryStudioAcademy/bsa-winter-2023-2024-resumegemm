import { type TemplateItemTags } from 'shared/build';

import { type TemplateSettings } from './types';

type StyleChange = {
    style: string;
    value: string;
    templateSettings: TemplateSettings;
    blockName: string;
    tagName?: TemplateItemTags;
};

export { type StyleChange };
