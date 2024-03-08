import { type TemplateBlockTitles } from '../../templates';
import { type CSSProperties } from './css-properties.type';
import { type LayoutItem } from './layout-item.type';

type LayoutBlock = {
    id: string;
    name: TemplateBlockTitles;
    items: LayoutItem[];
    styles: Partial<CSSProperties>;
    enabled?: boolean;
};

export { type LayoutBlock };
