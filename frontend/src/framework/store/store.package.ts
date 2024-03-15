import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
    configureStore,
} from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.store';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as editTemplateReducer } from '~/bundles/edit-template/store/edit-template.store';
import { templateApi } from '~/bundles/edit-template/templates.js';
import { industriesApi } from '~/bundles/industries/industries';
import { reducer as industriesReducer } from '~/bundles/industries/store/';
import { openAuthApi } from '~/bundles/open-auth/open-auth.js';
import { paymentApi } from '~/bundles/payment/payment.js';
import { reducer as paymentReducer } from '~/bundles/payment/store/payment.store';
import { profileApi } from '~/bundles/profile/profile';
import { reducer as profileReducer } from '~/bundles/profile/store/profile.store';
import { resumeApi } from '~/bundles/resume/resume.js';
import { reducer as resumeReducer } from '~/bundles/resume/store/index.js';
import { resumeAccessApi } from '~/bundles/resume-access/resume-access';
import { reducer as resumeAccessReducer } from '~/bundles/resume-access/store/';
import { reducer as templatesReducer } from '~/bundles/templates-page/store';
import { reducer as usersReducer } from '~/bundles/users/store/user.store';
import { userApi } from '~/bundles/users/users.js';
import { type IConfig } from '~/framework/config/config.js';

import { storage } from '../storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    industries: ReturnType<typeof industriesReducer>;
    payment: ReturnType<typeof paymentReducer>;
    templates: ReturnType<typeof templatesReducer>;
    resumes: ReturnType<typeof resumeReducer>;
    resumeAccess: ReturnType<typeof resumeAccessReducer>;
    profile: ReturnType<typeof profileReducer>;
    editTemplate: ReturnType<typeof editTemplateReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    openAuthApi: typeof openAuthApi;
    paymentApi: typeof paymentApi;
    storageApi: typeof storage;
    industriesApi: typeof industriesApi;
    templateApi: typeof templateApi;
    resumeApi: typeof resumeApi;
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
                industries: industriesReducer,
                payment: paymentReducer,
                templates: templatesReducer,
                resumes: resumeReducer,
                resumeAccess: resumeAccessReducer,
                profile: profileReducer,
                editTemplate: editTemplateReducer,
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
            resumeApi,
            resumeAccessApi,
            openAuthApi,
            profileApi,
        };
    }
}

export { Store };
