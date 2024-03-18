import {
    type Contacts,
    type PersonalInformation,
    type ResumeGetItemResponseDto,
} from 'shared/build';

type ConvertResumeItemToStringPayload = Pick<
    ResumeGetItemResponseDto,
    | 'certification'
    | 'education'
    | 'experience'
    | 'technicalSkills'
    | 'languages'
    | 'customSections'
> & {
    personalInformation: PersonalInformation;
    contacts: Contacts;
};

export { type ConvertResumeItemToStringPayload };
