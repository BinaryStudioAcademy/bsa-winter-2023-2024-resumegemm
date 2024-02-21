import { type TextStyle } from './types';

type TextStyleWithBox = TextStyle & {
    border: string;
    borderRadius: string;
    padding: string;
};

type TechStackStyles = {
    tech_stack__description_item: TextStyleWithBox;
};

export { type TechStackStyles };
