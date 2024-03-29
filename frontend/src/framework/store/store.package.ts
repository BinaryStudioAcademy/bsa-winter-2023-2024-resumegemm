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
import { industriesApi } from '~/bundles/industries/industries';
import { reducer as industriesReducer } from '~/bundles/industries/store/';
import { openAuthApi } from '~/bundles/open-auth/open-auth.js';
import { paymentApi } from '~/bundles/payment/payment.js';
import { reducer as paymentReducer } from '~/bundles/payment/store/payment.store';
import { pdfApi } from '~/bundles/pdf/pdf.js';
import { profileApi } from '~/bundles/profile/profile';
import { reducer as profileReducer } from '~/bundles/profile/store/profile.store';
import { recentlyViewedApi } from '~/bundles/recently-viewed/recently-viewed.js';
import { reducer as recentlyViewedReducer } from '~/bundles/recently-viewed/store/index.js';
import { resumeApi } from '~/bundles/resume/resume';
import { reducer as resumeReducer } from '~/bundles/resume/store/resume.store';
import { resumeAccessApi } from '~/bundles/resume-access/resume-access';
import { reducer as resumeAccessReducer } from '~/bundles/resume-access/store/';
import { statisticsApi } from '~/bundles/statistics-page/statistics';
import { reducer as statisticsReducer } from '~/bundles/statistics-page/store/statistics.store';
import { reducer as subscriptionReducer } from '~/bundles/subscription/store';
import { subscriptionApi } from '~/bundles/subscription/subscription';
import { reducer as templatesReducer } from '~/bundles/templates-page/store';
import { templateApi } from '~/bundles/templates-page/templates.js';
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
    resumeAccess: ReturnType<typeof resumeAccessReducer>;
    profile: ReturnType<typeof profileReducer>;
    statistics: ReturnType<typeof statisticsReducer>;
    editTemplate: ReturnType<typeof editTemplateReducer>;
    subscription: ReturnType<typeof subscriptionReducer>;
    resumes: ReturnType<typeof resumeReducer>;
    recentlyViewed: ReturnType<typeof recentlyViewedReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    openAuthApi: typeof openAuthApi;
    paymentApi: typeof paymentApi;
    storageApi: typeof storage;
    industriesApi: typeof industriesApi;
    templateApi: typeof templateApi;
    resumeAccessApi: typeof resumeAccessApi;
    profileApi: typeof profileApi;
    subscriptionApi: typeof subscriptionApi;
    statisticsApi: typeof statisticsApi;
    resumeApi: typeof resumeApi;
    pdfApi: typeof pdfApi;
    recentlyViewedApi: typeof recentlyViewedApi;
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
                resumeAccess: resumeAccessReducer,
                profile: profileReducer,
                statistics: statisticsReducer,
                editTemplate: editTemplateReducer,
                subscription: subscriptionReducer,
                resumes: resumeReducer,
                recentlyViewed: recentlyViewedReducer,
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
            resumeAccessApi,
            openAuthApi,
            profileApi,
            subscriptionApi,
            statisticsApi,
            resumeApi,
            pdfApi,
            recentlyViewedApi,
        };
    }
}

export { Store };
