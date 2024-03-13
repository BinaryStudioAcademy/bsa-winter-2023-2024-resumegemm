import { type ValueOf } from '~/types/value-of.type';

import { type TemplateItemTags } from '../../templates';
import { type CSSProperties } from './css-properties.type';

type LayoutItem = {
    id: string;
    name: string;
    tagName: ValueOf<typeof TemplateItemTags>;
    content: string;
    styles: Partial<CSSProperties>;
};

export { type LayoutItem };
