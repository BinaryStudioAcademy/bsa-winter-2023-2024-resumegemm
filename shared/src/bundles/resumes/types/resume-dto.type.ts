import {
    type Contacts,
    type Education,
    type Experience,
    type PersonalInformation,
    type TechnicalSkill,
} from '../content/content';

type ResumeDto = {
    id: string;
    title: string;
    image: string;
    userId: string;
    templateId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    contacts: Contacts;
    personalInformation: PersonalInformation;
    educations?: Education[];
    experiences?: Experience[];
    technicalSkills?: TechnicalSkill[];
};

export { type ResumeDto };
