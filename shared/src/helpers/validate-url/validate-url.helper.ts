const validateUrl = (url: string): boolean => {
    try {
        new URL(url);
    } catch {
        return false;
    }

    return true;
};

export { validateUrl };
