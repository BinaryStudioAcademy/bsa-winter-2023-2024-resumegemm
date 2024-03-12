enum ExceptionMessage {
    EMAIL_TAKEN = 'Email is already taken.',
    EMAIL_CONFIRM = 'Please, confirm email.',
    EMAIL_CONFIRM_TOKEN_NOT_FOUND = 'Email confirm token not found',
    USER_EXISTS = 'Such a user exists.',
    USER_NOT_FOUND = 'User was not found.',
    TOKEN_EXPIRED = 'Token expired.',
    INVALID_PASSWORD = 'Invalid password.',
    AUTH_FAILED = 'Authorization failed, please sign in again.',
    INVALID_REFRESH_TOKEN = 'Refresh token has expired or invalid.',
    INVALID_EMAIL_CONFIRM_TOKEN = 'Email confirm token has expired or invalid.',
    INVALID_OAUTH_ID = 'Oauth provider was not found.',
}

export { ExceptionMessage };
