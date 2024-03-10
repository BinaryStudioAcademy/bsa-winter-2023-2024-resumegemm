import { OauthStrategy } from 'shared/build/index.js';

const oauthUserSeed = [
    {
        email: 'user1@gmail.com',
        oauth_id: '123456777',
        oauth_strategy: OauthStrategy.FACEBOOK,
    },
    {
        email: 'user2@gmail.com',
        oauth_id: '123456888',
        oauth_strategy: OauthStrategy.FACEBOOK,
    },
    {
        email: 'user3@gmail.com',
        oauth_id: '123456999',
        oauth_strategy: OauthStrategy.GOOGLE,
    },
    {
        email: 'user4@gmail.com',
        oauth_id: '123456555',
        oauth_strategy: OauthStrategy.GOOGLE,
    },
];

export { oauthUserSeed };
