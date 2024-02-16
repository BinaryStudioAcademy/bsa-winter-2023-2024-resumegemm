import { type TextStyle } from './types';

type EducationStyles = {
    [K in
        | 'education__school'
        | 'education__location'
        | 'education__years'
        | 'education__degree']: TextStyle;
};

export { type EducationStyles };
