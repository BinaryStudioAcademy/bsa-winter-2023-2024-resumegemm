enum OpenAuthApiPath {
    ROOT = '/',
    USER = '/user',
    GITHUB = '/github',
    GOOGLE = '/google',
    FACEBOOK = '/facebook',
    LINKEDIN = '/linkedin',
    ID = '/:id',
    REDIRECT_CALLBACK = '/oauth/login/:provider',
}

export { OpenAuthApiPath };
