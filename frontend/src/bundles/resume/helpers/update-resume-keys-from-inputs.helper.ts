import { updateKeyInArray, updateKeyInObject } from '~/helpers/helpers.js';

import { type ResumeWithRelationsAndTemplateResponseDto } from '../types/types';

type ResumeValues = Omit<
    ResumeWithRelationsAndTemplateResponseDto,
    'templates'
>;

const updateResumeKeysFromInputs = <T extends ResumeValues>(
    resumeProperties: T,
    itemId: string,
    value: string,
): T => ({
    ...resumeProperties,
    personalInformation: updateKeyInObject(
        resumeProperties.personalInformation,
        itemId,
        value,
    ),
    contacts: updateKeyInObject(resumeProperties.contacts, itemId, value),
    education: updateKeyInArray(resumeProperties.education, itemId, value),
    experience: updateKeyInArray(resumeProperties.experience, itemId, value),
    technicalSkills: updateKeyInArray(
        resumeProperties.technicalSkills,
        itemId,
        value,
    ),
    customSections: updateKeyInArray(
        resumeProperties.customSections,
        itemId,
        value,
    ),
    certification: updateKeyInArray(
        resumeProperties.certification,
        itemId,
        value,
    ),
    languages: updateKeyInArray(resumeProperties.languages, itemId, value),
});

export { updateResumeKeysFromInputs };
