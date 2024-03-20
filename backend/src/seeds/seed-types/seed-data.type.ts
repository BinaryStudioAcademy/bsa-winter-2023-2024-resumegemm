import { type OauthStrategy } from 'shared/build/index.js';

import { type TemplateSettings } from '~/bundles/templates/types/types';
import { type LanguageLevels, type SkillLevel } from '~/common/enums/enums.js';

type User = {
    id: string;
    email: string;
    password_hash: string;
    password_salt: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    stripe_id: string;
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
    user_id: string;
    template_id: string;
};

type Template = {
    id: string;
    image: string;
    is_owner: boolean;
    template_settings: TemplateSettings;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    user_id: string;
};

type Review = {
    id: string;
    comment: string;
    score: number;
    created_at: Date;
    updated_at: Date;
    resume_id: string;
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
    resume_id: string;
};

type ContactDetails = {
    id: string;
    phone_number: string;
    social_contact: string;
    link: string;
    created_at: string;
    updated_at: string;
    resume_id: string;
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
    resume_id: string;
};

type TechnicalSkill = {
    id: string;
    skill_name: string;
    skill_level: SkillLevel;
    created_at: Date;
    updated_at: Date;
    resume_id: string;
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
    resume_id: string;
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
    resume_id: string;
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
    resume_id: string;
};

type Language = {
    id: string;
    language: string;
    language_level: LanguageLevels;
    created_at: Date;
    updated_at: Date;
    resume_id: string;
};

type OauthConnection = {
    id: string;
    user_id: string;
    email: string;
    oauth_strategy: OauthStrategy;
    oauth_id: string;
    created_at: Date;
    updated_at: Date;
};

type OauthUser = {
    id: string;
    email: string;
    oauth_strategy: OauthStrategy;
    oauth_id: string;
    created_at: Date;
    updated_at: Date;
    profile_id: string;
};

type ResumeSharedAccess = {
    id: string;
    resume_shared_link_id: string;
    resume_shared_access_ip: string;
    resume_shared_access_time: Date;
    created_at: Date;
    updated_at: Date;
};

type SubscriptionPlan = {
    id: string;
    stripe_plan_id: string;
    stripe_product_id: string;
    is_active: boolean;
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
    type Language,
    type OauthConnection,
    type OauthUser,
    type PersonalInformation,
    type Profile,
    type Resume,
    type ResumeSharedAccess,
    type Review,
    type SubscriptionPlan,
    type TechnicalSkill,
    type Template,
    type User,
};
