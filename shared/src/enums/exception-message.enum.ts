enum ExceptionMessage {
    EMAIL_TAKEN = 'Email is already taken.',
    USER_EXISTS = 'Such a user exists.',
    USER_NOT_FOUND = 'User was not found.',
    INVALID_PASSWORD = 'Invalid password.',
    AUTH_FAILED = 'Authorization failed, please sign in again.',
    INVALID_REFRESH_TOKEN = 'Refresh token has expired or invalid.',
    INVALID_RESET_TOKEN = 'Reset token has expired or invalid.',
    INVALID_OAUTH_ID = 'Oauth provider was not found.',
}

export { ExceptionMessage };
