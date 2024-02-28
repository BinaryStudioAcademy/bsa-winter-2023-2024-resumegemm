import {
    type Contacts,
    type Education,
    type Experience,
    type Language,
    type PersonalInformation,
    type TechnicalSkill,
} from '../content/content.js';
import { type Resume } from './resume.type.js';

type ResumeGetItemResponseDto = {
    resume: Resume;
    education: Education[] | [];
    experience: Experience[] | [];
    technicalSkills: TechnicalSkill[] | [];
    contacts: Contacts | null;
    personalInformation: PersonalInformation | null;
    languages: Language[] | [];
};

export { type ResumeGetItemResponseDto };
