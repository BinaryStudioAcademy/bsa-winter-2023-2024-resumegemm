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
    OAUTH: {
        GITHUB: {
            CLIENT_GITHUB_ID: string;
            CLIENT_GITHUB_SECRET: string;
        };
        GOOGLE: {
            CLIENT_GOOGLE_ID: string;
            CLIENT_GOOGLE_SECRET: string;
        };
        BASE_CALLBACK_URI: string;
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
};

export { type EnvironmentSchema };
