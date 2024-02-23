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
                    env: 'CLIENT_DEVELOPMENT_SERVER_URL',
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
                ACCESS_TOKEN_EXPIRES_IN: '24h',
                REFRESH_TOKEN_EXPIRES_IN: '30d',
            },
            EMAIL: {
                GMAIL_DOMAIN: {
                    doc: 'gmail email address',
                    format: String,
                    env: 'GMAIL_DOMAIN',
                    default: null,
                },
                GMAIL_PASSWORD: {
                    doc: 'gmail email password',
                    format: String,
                    env: 'GMAIL_PASSWORD',
                    default: null,
                },
                DASHBOARD_LINK: {
                    doc: 'dashboard link to redirect user in email',
                    format: String,
                    env: 'DASHBOARD_LINK',
                    default: null,
                },
                APP_LOGO_LINK: {
                    doc: 'logo link image',
                    format: String,
                    env: 'APP_LOGO_LINK',
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
        });
    }
}

export { Config };
