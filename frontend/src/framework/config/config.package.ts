import { type AppEnvironment } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type IConfig } from './interfaces/interfaces.js';
import { type EnvironmentSchema } from './types/types.js';

class Config implements IConfig {
    public ENV: EnvironmentSchema;

    public constructor() {
        this.ENV = this.envSchema;
    }

    private get envSchema(): EnvironmentSchema {
        return {
            APP: {
                ENVIRONMENT: import.meta.env.VITE_APP_NODE_ENV as ValueOf<
                    typeof AppEnvironment
                >,
                DOMAIN_URL: this.getDomain,
            },
            API: {
                ORIGIN_URL: import.meta.env.VITE_APP_API_ORIGIN_URL as string,
                PROXY_URL: import.meta.env.VITE_APP_PROXY_SERVER_URL as string,
            },
        };
    }

    private get getDomain(): string {
        return import.meta.env.PROD
            ? import.meta.env.VITE_APP_DOMAIN_URL
            : import.meta.env.VITE_APP_PROXY_SERVER_URL;
    }
}

export { Config };
