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
import { emailSubscriptionsApi } from '~/bundles/email-subscription/email-subscriptions';
import { reducer as emailSubscriptionsReducer } from '~/bundles/email-subscription/store/';
import { openAuthApi } from '~/bundles/open-auth/open-auth.js';
import { paymentApi } from '~/bundles/payment/payment.js';
import { reducer as paymentReducer } from '~/bundles/payment/store/payment.store';
import { profileApi } from '~/bundles/profile/profile';
import { reducer as profileReducer } from '~/bundles/profile/store/profile.store';
import { resumeAccessApi } from '~/bundles/resume-access/resume-access';
import { reducer as resumeAccessReducer } from '~/bundles/resume-access/store/';
import { reducer as usersReducer } from '~/bundles/users/store/user.store';
import { userApi } from '~/bundles/users/users.js';
import { type IConfig } from '~/framework/config/config.js';

import { storage } from '../storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    emailSubscription: ReturnType<typeof emailSubscriptionsReducer>;
    payment: ReturnType<typeof paymentReducer>;
    templates: ReturnType<typeof templatesReducer>;
    resumeAccess: ReturnType<typeof resumeAccessReducer>;
    profile: ReturnType<typeof profileReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    emailSubscriptionsApi: typeof emailSubscriptionsApi;
    openAuthApi: typeof openAuthApi;
    paymentApi: typeof paymentApi;
    storageApi: typeof storage;
    templateApi: typeof templateApi;
    resumeAccessApi: typeof resumeAccessApi;
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
                emailSubscription: emailSubscriptionsReducer,
                payment: paymentReducer,
                templates: templatesReducer,
                resumeAccess: resumeAccessReducer,
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
            emailSubscriptionsApi,
            templateApi,
            resumeAccessApi,
            openAuthApi,
            profileApi,
        };
    }
}

export { Store };
