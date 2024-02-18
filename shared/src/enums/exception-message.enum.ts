const ExceptionMessage = {
    EMAIL_TAKEN: 'Email is already taken.',
    USER_NOT_FOUND: 'User was not found.',
    INVALID_PASSWORD: 'Invalid password.',
    INVALID_TOKEN: 'Authorization failed, please sign in again.',
} as const;

export { ExceptionMessage };
