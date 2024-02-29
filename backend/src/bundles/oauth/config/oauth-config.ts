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
};

export { oauthConfigurations };
