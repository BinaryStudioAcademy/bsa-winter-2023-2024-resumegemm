import { OauthStrategy } from 'shared/build/index.js';

const oauthConnectionSeed = [
    {
        email: 'jojojoj@gmail.com',
        oauth_id: '123456789',
        oauth_strategy: OauthStrategy.FACEBOOK,
    },
    {
        email: 'dfssddd@gmail.com',
        oauth_id: '123456789',
        oauth_strategy: OauthStrategy.GITHUB,
    },
    {
        email: 'gdhfyrje@gmail.com',
        oauth_id: '123456789',
        oauth_strategy: OauthStrategy.GOOGLE,
    },
    {
        email: 'dddg@gmail.com',
        oauth_id: '123456789',
        oauth_strategy: OauthStrategy.GOOGLE,
    },
];

export { oauthConnectionSeed };
