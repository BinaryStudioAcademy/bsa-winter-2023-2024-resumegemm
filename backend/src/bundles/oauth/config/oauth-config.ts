import oauthPlugin from '@fastify/oauth2';

import { config } from '~/common/config/config.js';

const oauthConfigurations = {
    github: {
        credentials: {
            client: {
                id: config.ENV.OAUTH.GITHUB.CLIENT_GITHUB_ID,
                secret: config.ENV.OAUTH.GITHUB.CLIENT_GITHUB_SECRET,
            },
            auth: oauthPlugin.GITHUB_CONFIGURATION,
        },
    },
    google: {
        credentials: {
            client: {
                id: config.ENV.OAUTH.GOOGLE.CLIENT_GOOGLE_ID,
                secret: config.ENV.OAUTH.GOOGLE.CLIENT_GOOGLE_SECRET,
            },
            auth: oauthPlugin.GOOGLE_CONFIGURATION,
        },
    },
};

export { oauthConfigurations };
