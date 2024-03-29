import {
    type Certification,
    type Contacts,
    type CustomSection,
    type Education,
    type Experience,
    type Language,
    type PersonalInformation,
    type TechnicalSkill,
} from '../content/content.js';
import { type Resume } from './types.js';

type ResumeCreateItemRequestDto = {
    resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
    education?: Omit<
        Education,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >[];
    experience?: Omit<
        Experience,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >[];
    technicalSkills?: Omit<
        TechnicalSkill,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >[];
    personalInformation?: Omit<
        PersonalInformation,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >;
    contacts?: Omit<Contacts, 'id' | 'createdAt' | 'updatedAt' | 'resumeId'>;
    languages?: Omit<Language, 'id' | 'createdAt' | 'updatedAt' | 'resumeId'>[];
    certification?: Omit<
        Certification,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >[];
    customSections?: Omit<
        CustomSection,
        'id' | 'createdAt' | 'updatedAt' | 'resumeId'
    >[];
};

export { type ResumeCreateItemRequestDto };
