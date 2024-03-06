import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
    configureStore,
} from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.store';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as templatesReducer } from '~/bundles/edit-template/store/edit-template.store';
import { templateApi } from '~/bundles/edit-template/templates.js';
import { paymentApi } from '~/bundles/payment/payment.js';
import { reducer as paymentReducer } from '~/bundles/payment/store/payment.store';
import { profileApi } from '~/bundles/profile/profile';
import { reducer as profileReducer } from '~/bundles/profile/store/profile.store';
import { reducer as usersReducer } from '~/bundles/users/store/user.store';
import { userApi } from '~/bundles/users/users.js';
import { type IConfig } from '~/framework/config/config.js';

import { storage } from '../storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    payment: ReturnType<typeof paymentReducer>;
    templates: ReturnType<typeof templatesReducer>;
    profile: ReturnType<typeof profileReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    paymentApi: typeof paymentApi;
    storageApi: typeof storage;
    templateApi: typeof templateApi;
    profileApi: typeof profileApi;
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
                payment: paymentReducer,
                templates: templatesReducer,
                profile: profileReducer,
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
            paymentApi,
            storageApi: storage,
            templateApi,
            profileApi,
        };
    }
}

export { Store };
