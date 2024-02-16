import { type TextStyle } from './types';

type SocialsStyles = {
    [K in 'social__item' | 'social__link']: TextStyle;
};

export { type SocialsStyles };
