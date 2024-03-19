const createKeyValueStringFromResumeFields = (
    properties: Record<string, unknown>,
): string => {
    return Object.keys(properties)
        .map((key) => `${key}: ${properties[key]}`)
        .join(', ');
};

export { createKeyValueStringFromResumeFields };
