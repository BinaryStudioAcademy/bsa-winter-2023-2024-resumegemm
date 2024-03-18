const updateKeyInObject = <T extends Record<string, unknown>>(
    object: T | null,
    key: string,
    value: string,
): Record<string, unknown> => {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
        return { ...object, [key]: value };
    }
    return object as T;
};

export { updateKeyInObject };
