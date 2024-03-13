enum OpenAuthApiGetUserUrl {
    GITHUB = 'https://api.github.com/user',
    GOOGLE = 'https://www.googleapis.com/oauth2/v1/userinfo',
    FACEBOOK = 'https://graph.facebook.com/me?fields=email,name,picture,last_name',
    LINKEDIN = 'https://api.linkedin.com/v2/userinfo',
}

export { OpenAuthApiGetUserUrl };
