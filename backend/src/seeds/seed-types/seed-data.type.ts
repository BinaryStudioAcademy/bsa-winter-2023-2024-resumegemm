import { type SkillLevel } from '~/common/enums/enums.js';
import { type TemplateBlockSettings } from '~/common/types/types.js';

type User = {
    id: string;
    email: string;
    password_hash: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
};

type Profile = {
    first_name: string;
    last_name: string;
    avatar: string;
    id: string;
    created_at: Date;
    updated_at: Date;
};

type Resume = {
    id: string;
    resume_title: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

type Template = {
    id: string;
    image: string;
    is_owner: boolean;
    template_settings: TemplateBlockSettings;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

type Review = {
    id: string;
    comment: string;
    score: number;
    created_at: Date;
    updated_at: Date;
};

type Education = {
    id: string;
    institution: string;
    degree: string;
    currently_studying: boolean;
    city: string;
    country: string;
    description: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
};

type ContactDetails = {
    id: string;
    phone_number: string;
    social_contact: string;
    link: string;
    created_at: string;
    updated_at: string;
};

type Experience = {
    id: string;
    job_title: string;
    company_name: string;
    employment_type: string;
    city: string;
    country: string;
    description: string;
    start_date: Date;
    end_date: Date;
    currently_working: boolean;
    created_at: Date;
    updated_at: Date;
};

type TechnicalSkill = {
    id: string;
    skill_name: string;
    skill_level: SkillLevel;
    created_at: Date;
    updated_at: Date;
};

type PersonalInformation = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profession: string;
    industry: string;
    country: string;
    city: string;
    created_at: Date;
    updated_at: Date;
};

type Certification = {
    id: string;
    certification_name: string;
    authority: string;
    start_date: Date;
    end_date: Date;
    certification_url_or_code: string;
    description: string;
    created_at: Date;
    updated_at: Date;
};

type CustomSection = {
    id: string;
    activity: string;
    city: string;
    start_date: Date;
    end_date: Date;
    description: string;
    created_at: Date;
    updated_at: Date;
};

type Industry = {
    id: string;
    industry: string;
};

export {
    type Certification,
    type ContactDetails,
    type CustomSection,
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
