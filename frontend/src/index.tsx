import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import {
    CheckEmailPage,
    EmailConfirmationFailPage,
    EmailConfirmationPage,
    EmailConfirmationSuccessPage,
} from '~/bundles/auth/components/components.js';
import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    ErrorFallback,
    GuestRoute,
    PrivateRoute,
    RouterProvider,
    StoreProvider,
    StripeProvider,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { ToastProvider } from '~/bundles/toast/components/toast-provider';
import { store } from '~/framework/store/store';

import { EditTemplatePage } from './bundles/edit-template/edit-template';
import { LandingPage } from './bundles/landing-page/landing-page';
import { MainPage } from './bundles/main-page/main-page';
import { NotFoundPage } from './bundles/not-found-page/not-found-page';
import { SubscriptionPaymentPage } from './bundles/payment/pages/subscription-payment';
import { PreviewPage } from './bundles/preview/preview';
import { ResumeAccess } from './bundles/resume-access/pages/resume-access';
import { TemplatePage } from './bundles/templates-page/templates-page';
import { Profile } from './bundles/users/pages/profile';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <ToastProvider>
                <RouterProvider
                    routes={[
                        {
                            path: AppRoute.ROOT,
                            element: (
                                <ErrorBoundary
                                    FallbackComponent={ErrorFallback}
                                >
                                    <App />
                                </ErrorBoundary>
                            ),
                            children: [
                                {
                                    path: AppRoute.ROOT,
                                    element: <GuestRoute />,
                                    children: [
                                        {
                                            path: AppRoute.ROOT,
                                            element: <LandingPage />,
                                        },
                                    ],
                                },
                                {
                                    path: AppRoute.ROOT,
                                    element: <GuestRoute />,
                                    children: [
                                        {
                                            path: AppRoute.LOG_IN,
                                            element: <Auth />,
                                        },
                                        {
                                            path: AppRoute.SIGN_UP,
                                            element: <Auth />,
                                        },
                                        {
                                            path: AppRoute.RESUME_ACCESS,
                                            element: <ResumeAccess />,
                                        },
                                        {
                                            path: AppRoute.FORGOT_PASSWORD,
                                            element: <Auth />,
                                        },
                                        {
                                            path: AppRoute.CHECK_EMAIL,
                                            element: <CheckEmailPage />,
                                        },
                                    ],
                                },
                                {
                                    path: AppRoute.ROOT,
                                    element: <PrivateRoute />,
                                    children: [
                                        {
                                            path: AppRoute.PROFILE,
                                            element: <Profile />,
                                        },
                                        {
                                            path: AppRoute.HOME,
                                            element: <MainPage />,
                                        },
                                        {
                                            path: AppRoute.TEMPLATES,
                                            element: <TemplatePage />,
                                        },
                                        {
                                            path: `${AppRoute.TEMPLATE_EDITOR}/:id`,
                                            element: <EditTemplatePage />,
                                        },
                                    ],
                                },
                                {
                                    path: AppRoute.PAYMENT,
                                    element: (
                                        <StripeProvider>
                                            <SubscriptionPaymentPage />
                                        </StripeProvider>
                                    ),
                                },
                                {
                                    path: AppRoute.PREVIEW,
                                    element: <PreviewPage />,
                                },
                                {
                                    path: AppRoute.EMAIL_CONFIRMATION,
                                    element: <EmailConfirmationPage />,
                                },
                                {
                                    path: AppRoute.EMAIL_CONFIRMATION_FAIL,
                                    element: <EmailConfirmationFailPage />,
                                },
                                {
                                    path: AppRoute.EMAIL_CONFIRMATION_SUCCESS,
                                    element: <EmailConfirmationSuccessPage />,
                                },
                            ],
                        },
                        {
                            path: '*',
                            element: <NotFoundPage />,
                        },
                    ]}
                />
            </ToastProvider>
        </StoreProvider>
    </StrictMode>,
);
