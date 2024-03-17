import {
    type ResumeGetAllResponseDto,
    type TemplateSettings,
} from '../../types/types';
import { updateResumeFieldsFromTemplateSettings } from './update-resume-fields-from-template-settings.helper';

type CreateResumePayload = {
    firstName: string;
    email: string;
    templateSettings: TemplateSettings;
    image: string;
};

const createResumeFromTemplateSettings = <T extends ResumeGetAllResponseDto>({
    firstName,
    email,
    templateSettings,
    image,
}: CreateResumePayload): T => {
    const resumeShape = {
        resume: {
            resumeTitle: 'My Resume',
            image,
        },
        contacts: {
            phoneNumber: '',
        },
        personalInformation: {
            firstName,
            lastName: '',
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
                city: '',
                country: '',
                startDate: new Date(2015, 10),
                endDate: new Date(2017, 15),
            },
        ],
        languages: [
            {
                language: '',
            },
        ],
        technicalSkills: [
            {
                skillName: '',
            },
        ],
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
