import { type TextStyle } from './types';

type PortfolioStyles = {
    [K in
        | 'portfolio__title'
        | 'portfolio__description'
        | 'portfolio__link']: TextStyle;
};

export { type PortfolioStyles };
