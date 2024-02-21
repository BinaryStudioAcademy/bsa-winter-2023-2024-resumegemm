import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    AWS: {
        REGION: string;
        SECRET_ACCESS_KEY: string;
        ACCESS_KEY: string;
        BUCKET_NAME: string;
    }
};

export { type EnvironmentSchema };
