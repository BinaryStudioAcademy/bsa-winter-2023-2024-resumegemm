import { type TextStyle } from './types';

type TextStyleWithList = TextStyle & {
    listStyleType: string;
};

type SkillsStyles = {
    skills__description_item: TextStyleWithList;
};

export { type SkillsStyles };
