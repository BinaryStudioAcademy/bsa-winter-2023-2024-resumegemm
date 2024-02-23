import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        ORIGIN_URL: string;
    };
    JWT: {
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRES_IN: string;
        REFRESH_TOKEN_EXPIRES_IN: string;
    };
    COOKIE: {
        COOKIE_SECRET: string;
        EXPIRES_IN: number;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    EMAIL: {
        GMAIL_DOMAIN: string;
        GMAIL_PASSWORD: string;
        DASHBOARD_LINK: string;
        APP_LOGO_LINK: string;
    };
};

export { type EnvironmentSchema };
