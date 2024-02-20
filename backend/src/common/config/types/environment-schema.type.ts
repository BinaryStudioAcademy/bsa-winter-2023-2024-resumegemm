import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    JWT: {
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRES_IN: string;
        REFRESH_TOKEN_EXPIRES_IN: string;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    OPEN_AI: {
        API_KEY: string;
    };
};

export { type EnvironmentSchema };
