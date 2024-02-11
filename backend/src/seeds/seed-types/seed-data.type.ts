type SaveImageDto = {
    image_source: string;
};

type Image = SaveImageDto & {
    id: number;
};
type SaveUserDto = {
    username: string;
    email: string;
    password_hash: string;
    password_salt: string;
    recovery_code: string;
};

type User = SaveUserDto & {
    id: number;
};

type SaveResumeDto = {
    resume_title: string;
};

type Resume = SaveResumeDto & {
    id: number;
};

type SaveTemplateDto = {
    is_owner: boolean;
};

type Template = SaveTemplateDto & {
    id: number;
};

type SaveReviewDto = {
    comment: string;
    score: number;
};

type Review = SaveReviewDto & {
    id: number;
};

type SaveEducationDto = {
    major_name: string;
    degree: string;
    location: string;
    start_date: Date;
    end_date: Date;
};

type Education = SaveEducationDto & {
    id: number;
};

type SaveContactDetailsDto = {
    mobile_number: string;
    home_number: string;
    address: string;
    social_contact: string;
};

type ContactDetails = SaveContactDetailsDto & {
    id: number;
};

type SaveExperienceDto = {
    job_title: string;
    employer: string;
    employment_type: string;
    start_date: Date;
    end_date: Date;
};

type Experience = SaveExperienceDto & {
    id: number;
};

type SaveTechnicalSkillDto = {
    skill_name: string;
    skill_level: string;
};

type TechnicalSkill = SaveTechnicalSkillDto & {
    id: number;
};

type SavePersonalInformationDto = {
    profession: string;
    address: string;
    city: string;
    state: string;
};

type PersonalInformation = SavePersonalInformationDto & {
    id: number;
};

export {
    type ContactDetails,
    type Education,
    type Experience,
    type Image,
    type PersonalInformation,
    type Resume,
    type Review,
    type SaveContactDetailsDto,
    type SaveEducationDto,
    type SaveExperienceDto,
    type SaveImageDto,
    type SavePersonalInformationDto,
    type SaveResumeDto,
    type SaveReviewDto,
    type SaveTechnicalSkillDto,
    type SaveTemplateDto,
    type SaveUserDto,
    type TechnicalSkill,
    type Template,
    type User,
};
