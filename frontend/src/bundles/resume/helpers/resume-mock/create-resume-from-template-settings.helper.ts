import {
    type ResumeGetAllResponseDto,
    type TemplateSettings,
} from '../../types/types';
import { updateResumeFieldsFromTemplateSettings } from './update-resume-fields-from-template-settings.helper';

type CreateResumePayload = {
    firstName: string;
    lastName: string | null;
    email: string;
    templateSettings: TemplateSettings;
    image: string;
};

const createResumeFromTemplateSettings = <T extends ResumeGetAllResponseDto>({
    firstName,
    lastName,
    email,
    templateSettings,
    image,
}: CreateResumePayload): T => {
    const resumeShape = {
        resume: {
            resumeTitle: '',
            image,
        },
        contacts: {
            phoneNumber: '',
            socialContact: '',
            link: '',
        },
        personalInformation: {
            firstName,
            lastName,
            email,
            profession: '',
            industry: '',
            city: '',
            country: '',
        },
        experience: [
            {
                jobTitle: '',
                companyName: '',
                employmentType: '',
                city: '',
                country: '',
                startDate: new Date(2015, 10),
                endDate: new Date(2017, 15),
            },
        ],
        education: [
            {
                institution: '',
                degree: '',
                description: '',
                startDate: new Date(2015, 10),
                endDate: new Date(2017, 15),
                city: '',
                country: '',
            },
        ],
        languages: [
            {
                language: '',
                languageLevel: '',
            },
        ],
        certification: [
            {
                certificationName: '',
                authority: '',
                certificationUrlOrCode: '',
                startDate: new Date(2015, 10),
                endDate: new Date(2017, 15),
            },
        ],
        customSections: [],
        technicalSkills: [],
    };

    for (const container of templateSettings.containers) {
        for (const block of container.blocks) {
            for (const item of block.items) {
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.personalInformation,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.contacts,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.education,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.experience,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.certification,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.technicalSkills,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.languages,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.customSections,
                    item,
                    true,
                );
            }
        }
    }
    const checkLanguagesFields = resumeShape.languages.every(
        (lang) => lang.language === '',
    );
    return {
        ...resumeShape,
        resume: {
            ...resumeShape.resume,
            resumeTitle: resumeShape.personalInformation.profession,
            languages: checkLanguagesFields
                ? (resumeShape.languages.length = 0)
                : resumeShape.languages,
        },
    } as unknown as T;
};

export { createResumeFromTemplateSettings };
