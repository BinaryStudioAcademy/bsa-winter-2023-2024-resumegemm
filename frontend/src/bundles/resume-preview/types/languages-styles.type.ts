import { type TextStyle } from './types';

type LanguagesStyles = {
    [K in 'languages__title' | 'languages__level']: TextStyle;
};

export { type LanguagesStyles };
