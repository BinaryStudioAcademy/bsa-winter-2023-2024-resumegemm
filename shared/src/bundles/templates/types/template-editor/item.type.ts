import { type CSSProperties } from './css-properties.type';

type Item = {
    id: string;
    name: string;
    type: 'h1' | 'p' | 'img';
    content: string;
    styles: Partial<CSSProperties>;
};

export { type Item };
