import { type TextStyle } from './types';

type ExperienceStylesBase = {
    [K in
        | 'experience__info_job_position'
        | 'experience__info_company'
        | 'experience__info_employment_type'
        | 'experience__info_location_type'
        | 'experience__info_work_period'
        | 'experience__info_work_location']: TextStyle;
};

type ExperienceDescriptionItemStyles = {
    experience__info_description_item: TextStyle & {
        listStyleType: string;
    };
};

type ExperienceStyles = ExperienceStylesBase & ExperienceDescriptionItemStyles;

export {
    type ExperienceDescriptionItemStyles,
    type ExperienceStyles,
    type ExperienceStylesBase,
};
