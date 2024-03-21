enum ExceptionMessage {
    EMAIL_TAKEN = 'Email is already taken.',
    EMAIL_CONFIRM = 'Please, confirm email.',
    EMAIL_CONFIRM_TOKEN_NOT_FOUND = 'Email confirm token not found',
    DELETED_ACCOUNT_WITH_THIS_EMAIL = 'This email is already taken. Please try another one.',
    INVALID_EMAIL = 'Invalid email. Please check and try again.',
    USER_EXISTS = 'Such a user exists.',
    USER_NOT_FOUND = 'User with this email was not found.',
    INVALID_PASSWORD = 'Invalid password. Please check and try again.',
    TOKEN_EXPIRED = 'Token expired.',
    AUTH_FAILED = 'Authorization failed, please sign in again.',
    INVALID_REFRESH_TOKEN = 'Refresh token has expired or invalid.',
    INVALID_EMAIL_CONFIRM_TOKEN = 'Email confirm token has expired or invalid.',
    INVALID_OAUTH_ID = 'Oauth provider was not found.',
    RESUME_NOT_FOUND = 'Resume not found',
    INVALID_RESET_TOKEN = 'Reset token has expired or invalid.',
    NO_ACTIVE_ACCOUNT = 'No active account found with this email.',
}

export { ExceptionMessage };
