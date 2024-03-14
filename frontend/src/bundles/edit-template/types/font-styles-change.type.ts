import { type TemplateItemTags } from 'shared/build';

import { type FontStyles } from '../enums/font-styles';
import { type TemplateSettings } from './types';

type FontStyleChange = {
    fontStyle: FontStyles;
    fontSize: string;
    fontFamily: string;
    templateSettings: TemplateSettings;
    blockName: string;
    tagName?: TemplateItemTags;
};

export { type FontStyleChange };
