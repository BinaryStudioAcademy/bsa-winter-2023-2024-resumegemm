import { OauthStrategy, OpenAuthApiPath } from 'shared/build';

const socialMediaProfiles = [
    {
        id: null,
        provider: OauthStrategy.GITHUB,
        connected: false,
        redirect: OpenAuthApiPath.GITHUB,
    },
    {
        id: null,
        provider: OauthStrategy.FACEBOOK,
        connected: false,
        redirect: OpenAuthApiPath.FACEBOOK,
    },
    {
        id: null,
        provider: OauthStrategy.GOOGLE,
        connected: false,
        redirect: OpenAuthApiPath.GOOGLE,
    },
];

export { socialMediaProfiles };
