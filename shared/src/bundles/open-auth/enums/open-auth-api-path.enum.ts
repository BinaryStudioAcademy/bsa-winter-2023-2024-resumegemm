enum OpenAuthApiPath {
    ROOT = '/',
    USER = '/user',
    GITHUB = '/github',
    GOOGLE = '/google',
    FACEBOOK = '/facebook',
    DISCONNECT = '/disconnect/:id',
    REDIRECT_CALLBACK = '/oauth/login/:provider',
}

export { OpenAuthApiPath };
