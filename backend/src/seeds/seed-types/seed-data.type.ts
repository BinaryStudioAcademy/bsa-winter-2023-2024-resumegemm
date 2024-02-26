import { type SkillLevel } from '~/common/enums/enums.js';
import { type TemplateBlockSettings } from '~/common/types/types.js';

type User = {
    id: string;
    first_name: string;
    email: string;
    password_hash: string;
    password_salt: string;
};

type Profile = {
    first_name: string;
    last_name: string;
    avatar: string;
    id: string;
};

type Resume = {
    id: string;
    resume_title: string;
};

type Template = {
    id: string;
    is_owner: boolean;
    templapte_settings: TemplateBlockSettings;
};

type Review = {
    id: string;
    comment: string;
    score: number;
};

type Education = {
    id: string;
    major_name: string;
    degree: string;
    location: string;
    start_date: Date;
    end_date: Date;
};

type ContactDetails = {
    id: string;
    mobile_number: string;
    home_number: string;
    address: string;
    social_contact: string;
};

type Experience = {
    id: string;
    job_title: string;
    employer: string;
    employment_type: string;
    start_date: Date;
    end_date: Date;
};

type TechnicalSkill = {
    id: string;
    skill_name: string;
    skill_level: SkillLevel;
};

type PersonalInformation = {
    id: string;
    profession: string;
    address: string;
    city: string;
    state: string;
};

type Industry = {
    id: string;
    industry: string;
};

export {
    type ContactDetails,
    type Education,
    type Experience,
    type Industry,
    type PersonalInformation,
    type Profile,
    type Resume,
    type Review,
    type TechnicalSkill,
    type Template,
    type User,
};
