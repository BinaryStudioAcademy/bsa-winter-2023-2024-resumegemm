import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as templatesReducer } from '~/bundles/edit-temlate/store/';
import { templateApi } from '~/bundles/edit-temlate/templates.js';
import { emailSubscriptionsApi } from '~/bundles/email-subscription/email-subscriptions';
import { reducer as emailSubscriptionsReducer } from '~/bundles/email-subscription/store/';
import { reducer as usersReducer } from '~/bundles/users/store/';
import { userApi } from '~/bundles/users/users.js';
import { type IConfig } from '~/framework/config/config.js';

import { storage } from '../storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    emailSubscription: ReturnType<typeof emailSubscriptionsReducer>;
    templates: ReturnType<typeof templatesReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    emailSubscriptionsApi: typeof emailSubscriptionsApi;
    storageApi: typeof storage;
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
                emailSubscription: emailSubscriptionsReducer,
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
            storageApi: storage,
            emailSubscriptionsApi,
            templateApi,
        };
    }
}

export { Store };
