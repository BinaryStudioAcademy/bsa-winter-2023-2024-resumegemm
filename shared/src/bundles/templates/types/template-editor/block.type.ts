import { type TemplateBlockTitles } from '../../templates';
import { type CSSProperties } from './css-properties.type';
import { type Item } from './item.type';

type Block = {
    id: string;
    name: TemplateBlockTitles;
    items: Item[];
    styles: Partial<CSSProperties>;
    enabled?: boolean;
};

export { type Block };
