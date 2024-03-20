import { type LayoutItem } from '../../types/types';
import { availableResumeKeys } from './available-resume-keys.helper';

const checkEmptyFieldsInArray = (array: Record<string, unknown>[]): boolean => {
    return array.some((item) => {
        return Object.values(item).every((field) => field === '');
    });
};

const updateResumeContent = (
    array: Record<string, unknown>[],
    item: LayoutItem,
): void => {
    if (checkEmptyFieldsInArray(array)) {
        array.length = 0;
        return;
    }
    for (const object of array) {
        if (Object.prototype.hasOwnProperty.call(object, item.id)) {
            object[item.id] = item.content;
        }
    }
};

const updateResumeFieldsFromTemplateSettings = (
    resumeFields: Record<string, unknown> | Record<string, unknown>[],
    item: LayoutItem,
    isCustomSection?: boolean,
): void => {
    if (availableResumeKeys.has(item.id)) {
        if (Array.isArray(resumeFields)) {
            updateResumeContent(resumeFields, item);
        }
        if (Object.prototype.hasOwnProperty.call(resumeFields, item.id)) {
            (resumeFields as Record<string, unknown>)[item.id] = item.content;
        }
    } else {
        if (isCustomSection) {
            for (const object of resumeFields as Record<string, unknown>[]) {
                object[item.id] = item.content;
            }
        }
    }
};

export { updateResumeFieldsFromTemplateSettings };
