import {
    type Contacts,
    type Education,
    type Experience,
    type PersonalInformation,
    type TechnicalSkill,
} from '../content/content.js';
import { type Resume } from './resume.type';

type ResumeGetItemResponseDto = {
    resume: Resume;
    education: Education[] | [];
    experience: Experience[] | [];
    technicalSkills: TechnicalSkill[] | [];
    contacts: Contacts | null;
    personalInformation: PersonalInformation | null;
};

export { type ResumeGetItemResponseDto };