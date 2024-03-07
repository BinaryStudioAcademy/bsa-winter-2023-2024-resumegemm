import { type Block } from './block.type';
import { type CSSProperties } from './css-properties.type';

type Container = {
    id: string;
    name: string;
    blocks: Block[];
    styles: Partial<CSSProperties>;
};

export { type Container };
