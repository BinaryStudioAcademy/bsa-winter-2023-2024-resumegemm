import { type CSSProperties } from './css-properties.type';
import { type LayoutBlock } from './layout-block.type';

type LayoutContainer = {
    id: string;
    name: string;
    blocks: LayoutBlock[];
    styles: Partial<CSSProperties>;
};

export { type LayoutContainer };
