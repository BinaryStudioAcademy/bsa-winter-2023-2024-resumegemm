import {
    type ResumeGetAllResponseDto,
    type TemplateSettings,
} from '../../types/types';
import { updateResumeFieldsFromTemplateSettings } from './update-resume-fields-from-template-settings.helper';

type CreateResumePayload = {
    firstName: string;
    email: string;
    templateSettings: TemplateSettings;
    avatar?: string;
};

const createResumeFromTemplateSettings = <T extends ResumeGetAllResponseDto>({
    firstName,
    email,
    templateSettings,
    avatar,
}: CreateResumePayload): T => {
    const resumeShape = {
        resume: {
            resumeTitle: 'My Resume',
            image: avatar ?? 'https://i.imgur.com/PhlZpUd.png',
        },
        contacts: {
            phoneNumber: '+4522323233',
        },
        personalInformation: {
            firstName,
            lastName: 'Doe',
            email,
            profession: 'Senior',
            industry: 'IT',
            city: 'My city',
            country: 'New York',
        },
        experience: [
            {
                companyName: 'Facebook',
                jobTitle: 'Developer',
                city: 'Miami basd',
                country: 'New York',
                startDate: new Date(2015, 0),
                endDate: new Date(2017, 10),
            },
        ],
        education: [
            {
                institution: 'Harvard University',
                degree: 'Master',
                startDate: new Date(2015, 10),
                endDate: new Date(2017, 15),
                city: 'Milan',
                country: 'Italy',
                description: 'Description here ',
            },
        ],
        technicalSkills: [],
        languages: [],
        customSections: [],
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
                    resumeShape.experience,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.technicalSkills,
                    item,
                );
                updateResumeFieldsFromTemplateSettings(
                    resumeShape.education,
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
    return resumeShape as unknown as T;
};

export { createResumeFromTemplateSettings };
