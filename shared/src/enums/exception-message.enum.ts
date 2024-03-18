enum ExceptionMessage {
    EMAIL_TAKEN = 'Email is already taken.',
    EMAIL_CONFIRM = 'Please, confirm email.',
    EMAIL_CONFIRM_TOKEN_NOT_FOUND = 'Email confirm token not found',
    INVALID_EMAIL = 'Invalid email. Please check and try again.',
    USER_EXISTS = 'Such a user exists.',
    USER_NOT_FOUND = 'User was not found.',
    INVALID_PASSWORD = 'Invalid password. Please check and try again.',
    TOKEN_EXPIRED = 'Token expired.',
    AUTH_FAILED = 'Authorization failed, please sign in again.',
    INVALID_REFRESH_TOKEN = 'Refresh token has expired or invalid.',
    INVALID_EMAIL_CONFIRM_TOKEN = 'Email confirm token has expired or invalid.',
    INVALID_OAUTH_ID = 'Oauth provider was not found.',
    INVALID_RESET_TOKEN = 'Reset token has expired or invalid.',
    NO_ACTIVE_ACCOUNT = 'No active account found with this email.',
}

export { ExceptionMessage };
