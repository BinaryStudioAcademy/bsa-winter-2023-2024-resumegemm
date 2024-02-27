import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
    configureStore,
} from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as templatesReducer } from '~/bundles/edit-temlate/store/';
import { templateApi } from '~/bundles/edit-temlate/templates.js';
import { industriesApi } from '~/bundles/industries/industries';
import { reducer as industriesReducer } from '~/bundles/industries/store/';
import { paymentApi } from '~/bundles/payment/payment.js';
import { reducer as paymentReducer } from '~/bundles/payment/store';
import { reducer as usersReducer } from '~/bundles/users/store/';
import { userApi } from '~/bundles/users/users.js';
import { type IConfig } from '~/framework/config/config.js';

import { storage } from '../storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    industries: ReturnType<typeof industriesReducer>;
    payment: ReturnType<typeof paymentReducer>;
    templates: ReturnType<typeof templatesReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    paymentApi: typeof paymentApi;
    storageApi: typeof storage;
    industriesApi: typeof industriesApi;
    templateApi: typeof templateApi;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            AnyAction,
            MiddlewareArray<
                [ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]
            >
        >
    >;

    public constructor(config: IConfig) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                users: usersReducer,
                industries: industriesReducer,
                payment: paymentReducer,
                templates: templatesReducer,
            },
            middleware: (getDefaultMiddleware) => {
                return getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                });
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            industriesApi,
            paymentApi,
            storageApi: storage,
            templateApi,
        };
    }
}

export { Store };
