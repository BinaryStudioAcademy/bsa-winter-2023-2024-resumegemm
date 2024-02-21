import { type TextStyle } from './types';

type TextStyleWithList = TextStyle & {
    listStyleType: string;
};

type SummaryStyles = {
    summary__description_item: TextStyleWithList;
};

export { type SummaryStyles };
