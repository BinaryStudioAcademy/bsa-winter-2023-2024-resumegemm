import { type ConvertResumeItemToStringPayload } from '~/bundles/common/types/types.js';

import { createKeyValueStringFromResumeFields } from './create-key-value-string.helper.js';

const convertResumeItemFieldsToString = ({
    education,
    certification,
    customSections,
    personalInformation,
    technicalSkills,
    experience,
    contacts,
    languages,
}: ConvertResumeItemToStringPayload): string => {
    const mergedResumeFields = [
        ...education,
        ...customSections,
        ...experience,
        ...certification,
        ...technicalSkills,
        ...languages,
        personalInformation,
        contacts,
    ];

    const omitUnnecessaryPropertiesAndConvertResumeFields =
        mergedResumeFields.map(
            ({
                id,
                createdAt,
                updatedAt,
                resumeId,
                ...restResumeProperties
            }) => {
                return createKeyValueStringFromResumeFields(
                    restResumeProperties,
                );
            },
        );
    return omitUnnecessaryPropertiesAndConvertResumeFields.join('');
};

export { convertResumeItemFieldsToString };
