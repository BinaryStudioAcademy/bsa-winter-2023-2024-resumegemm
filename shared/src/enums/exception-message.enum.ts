enum ExceptionMessage {
    EMAIL_TAKEN = 'Email is already taken.',
    INVALID_EMAIL = 'Invalid email. Please check and try again.',
    USER_EXISTS = 'Such a user exists.',
    USER_NOT_FOUND = 'User was not found.',
    INVALID_PASSWORD = 'Invalid password. Please check and try again.',
    AUTH_FAILED = 'Authorization failed, please sign in again.',
    INVALID_REFRESH_TOKEN = 'Refresh token has expired or invalid.',
}

export { ExceptionMessage };
