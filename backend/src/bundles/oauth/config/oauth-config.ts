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
        scope: ['email'],
    },
    google: {
        credentials: {
            client: {
                id: config.ENV.OAUTH.GOOGLE.CLIENT_GOOGLE_ID,
                secret: config.ENV.OAUTH.GOOGLE.CLIENT_GOOGLE_SECRET,
            },
            auth: oauthPlugin.GOOGLE_CONFIGURATION,
        },
        scope: ['profile', 'email'],
    },
    facebook: {
        credentials: {
            client: {
                id: config.ENV.OAUTH.FACEBOOK.CLIENT_FACEBOOK_ID,
                secret: config.ENV.OAUTH.FACEBOOK.CLIENT_FACEBOOK_SECRET,
            },
            auth: oauthPlugin.FACEBOOK_CONFIGURATION,
        },
        scope: ['public_profile', 'email'],
    },
    linkedin: {
        credentials: {
            client: {
                id: config.ENV.OAUTH.LINKEDIN.CLIENT_LINKEDIN_ID,
                secret: config.ENV.OAUTH.LINKEDIN.CLIENT_LINKEDIN_SECRET,
            },
            auth: oauthPlugin.LINKEDIN_CONFIGURATION,
            options: {
                bodyFormat: config.ENV.OAUTH.LINKEDIN.OPTIONS.bodyFormat,
                authorizationMethod:
                    config.ENV.OAUTH.LINKEDIN.OPTIONS.authorizationMethod,
            },
        },
        scope: ['profile', 'email', 'openid'],
    },
};

export { oauthConfigurations };
