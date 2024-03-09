import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type IConfig } from './interfaces/interfaces.js';
import { type EnvironmentSchema } from './types/types.js';

class Config implements IConfig {
    private logger: ILogger;

    public ENV: EnvironmentSchema;

    public constructor(logger: ILogger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => this.logger.info(message),
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
                ORIGIN_URL: {
                    doc: 'Http origin for development',
                    format: String,
                    env:
                        process.env.NODE_ENV === AppEnvironment.PRODUCTION
                            ? 'PRODUCTION_ORIGIN_URL'
                            : 'CLIENT_DEVELOPMENT_SERVER_URL',
                    default: null,
                },
            },
            JWT: {
                ACCESS_TOKEN_SECRET: {
                    doc: 'Secret key for access token generation',
                    format: String,
                    env: 'ACCESS_TOKEN_SECRET',
                    default: null,
                },
                REFRESH_TOKEN_SECRET: {
                    doc: 'Secret key for refresh token generation',
                    format: String,
                    env: 'REFRESH_TOKEN_SECRET',
                    default: null,
                },
                EMAIL_CONFIRM_TOKEN_SECRET: {
                    doc: 'Secret key for email confirm token generation',
                    format: String,
                    env: 'EMAIL_CONFIRM_TOKEN_SECRET',
                    default: null,
                },
                ACCESS_TOKEN_EXPIRES_IN: '24h',
                REFRESH_TOKEN_EXPIRES_IN: '30d',
                EMAIL_CONFIRM_TOKEN_EXPIRES_IN: '8m',
            },
            EMAIL: {
                SMTP_HOST: {
                    doc: 'mock.smtp.server',
                    format: String,
                    env: 'SMTP_HOST',
                    default: null,
                },
                SMTP_PORT: {
                    doc: 'port',
                    format: String,
                    env: 'SMTP_PORT',
                    default: null,
                },
                SMTP_USER: {
                    doc: 'your email',
                    format: String,
                    env: 'SMTP_USER',
                    default: null,
                },
                SMTP_PASSWORD: {
                    doc: 'your password',
                    format: String,
                    env: 'SMTP_PASSWORD',
                    default: null,
                },
                SMTP_DASHBOARD: {
                    doc: 'dashboard link to redirect user in email',
                    format: String,
                    env: 'SMTP_DASHBOARD',
                    default: null,
                },
                SMTP_LOGO: {
                    doc: 'logo link image',
                    format: String,
                    env: 'SMTP_LOGO',
                    default: null,
                },
            },
            OAUTH: {
                GITHUB: {
                    CLIENT_GITHUB_ID: {
                        doc: 'Github secret for client id',
                        format: String,
                        env: 'CLIENT_GITHUB_ID',
                        default: null,
                    },
                    CLIENT_GITHUB_SECRET: {
                        doc: 'Github secret client token',
                        format: String,
                        env: 'CLIENT_GITHUB_SECRET',
                        default: null,
                    },
                },
                GOOGLE: {
                    CLIENT_GOOGLE_ID: {
                        doc: 'Google secret for client id',
                        format: String,
                        env: 'CLIENT_GOOGLE_ID',
                        default: null,
                    },
                    CLIENT_GOOGLE_SECRET: {
                        doc: 'Google client secret',
                        format: String,
                        env: 'CLIENT_GOOGLE_SECRET',
                        default: null,
                    },
                },
                FACEBOOK: {
                    CLIENT_FACEBOOK_ID: {
                        doc: 'Facebook app id',
                        format: String,
                        env: 'CLIENT_FACEBOOK_ID',
                        default: null,
                    },
                    CLIENT_FACEBOOK_SECRET: {
                        doc: 'Facebook client secret',
                        format: String,
                        env: 'CLIENT_FACEBOOK_SECRET',
                        default: null,
                    },
                },
                BASE_CALLBACK_URI: {
                    doc: 'Secret key for callback url',
                    format: String,
                    env: 'BASE_OAUTH_CALLBACK_URI',
                    default: null,
                },
            },
            COOKIE: {
                COOKIE_SECRET: {
                    doc: 'Secret key for cookie',
                    format: String,
                    env: 'COOKIE_SECRET',
                    default: null,
                },
                EXPIRES_IN: 60 * 60 * 24 * 30,
            },
            DB: {
                CONNECTION_STRING: {
                    doc: 'Database connection string',
                    format: String,
                    env: 'DB_CONNECTION_STRING',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            STRIPE: {
                STRIPE_SECRET_KEY: {
                    doc: 'Stripe secret key',
                    format: String,
                    env: 'STRIPE_SECRET_KEY',
                    default: null,
                },
                STRIPE_PUBLISHABLE_KEY: {
                    doc: 'Stripe publishable key',
                    format: String,
                    env: 'STRIPE_PUBLISHABLE_KEY',
                    default: null,
                },
                STRIPE_WEBHOOK_SECRET: {
                    doc: 'Stripe webhook secret',
                    format: String,
                    env: 'STRIPE_WEBHOOK_SECRET',
                    default: null,
                },
            },
            OPEN_AI: {
                API_KEY: {
                    doc: 'OpenAI API key',
                    format: String,
                    env: 'OPEN_AI_API_KEY',
                    default: null,
                },
            },
            AWS: {
                REGION: {
                    doc: 'AWS region string',
                    format: String,
                    env: 'AWS_REGION',
                    default: null,
                },
                SECRET_ACCESS_KEY: {
                    doc: 'AWS secret key string',
                    format: String,
                    env: 'AWS_SECRET_ACCESS_KEY',
                    default: null,
                },
                ACCESS_KEY: {
                    doc: 'AWS access key string',
                    format: String,
                    env: 'AWS_ACCESS_KEY',
                    default: null,
                },
                BUCKET_NAME: {
                    doc: 'AWS bucket name string',
                    format: String,
                    env: 'AWS_BUCKET_NAME',
                    default: null,
                },
            },
        });
    }
}

export { Config };
