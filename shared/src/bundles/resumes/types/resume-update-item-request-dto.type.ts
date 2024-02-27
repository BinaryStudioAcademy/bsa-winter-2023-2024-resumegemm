import {
    type Contacts,
    type Education,
    type Experience,
    type PersonalInformation,
    type TechnicalSkill,
} from '../content/content.js';
import { type Resume } from './types.js';

type ResumeUpdateItemRequestDto = {
    resume: Partial<
        Omit<Resume, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId'>
    >;
    education: Partial<
        Omit<Education, 'createdAt' | 'updatedAt' | 'resumeId'>
    >[];
    experience: Partial<
        Omit<Experience, 'createdAt' | 'updatedAt' | 'resumeId'>
    >[];
    technicalSkills: Partial<
        Omit<TechnicalSkill, 'createdAt' | 'updatedAt' | 'resumeId'>
    >[];
    personalInformation: Partial<
        Omit<PersonalInformation, 'id' | 'createdAt' | 'updatedAt' | 'resumeId'>
    >;
    contacts: Partial<
        Omit<Contacts, 'id' | 'createdAt' | 'updatedAt' | 'resumeId'>
    >;
};

export { type ResumeUpdateItemRequestDto };
