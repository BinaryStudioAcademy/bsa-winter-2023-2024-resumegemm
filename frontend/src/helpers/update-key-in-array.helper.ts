import { updateKeyInObject } from './update-key-in-object.helper.js';

const updateKeyInArray = <T extends Record<string, unknown>>(
    array: T[] | null,
    key: string,
    value: string,
): T[] => {
    if (!Array.isArray(array)) {
        return [];
    }
    return array.map((object) => {
        return updateKeyInObject(object, key, value) as T;
    });
};

export { updateKeyInArray };
