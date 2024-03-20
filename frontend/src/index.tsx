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
    HeaderWrapper,
    PrivateRoute,
    RouterProvider,
    StoreProvider,
    StripeProvider,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { CreateResume } from '~/bundles/resume/pages/create-resume/create-resume';
import { EditResume } from '~/bundles/resume/pages/edit-resume/edit-resume';
import { ResumePage } from '~/bundles/resume/pages/resume-page';
import { ToastProvider } from '~/bundles/toast/components/toast-provider';
import { store } from '~/framework/store/store';

import { EditTemplatePage } from './bundles/edit-template/edit-template';
import { LandingPage } from './bundles/landing-page/landing-page';
import { MainPage } from './bundles/main-page/main-page';
import { NotFoundPage } from './bundles/not-found-page/not-found-page';
import { Payment } from './bundles/payment/pages/payment/payment';
import { PreviewPage } from './bundles/preview/preview';
import { QuestionAndAnswerPage } from './bundles/question-and-answer-page/question-and-answer-page';
import { ResumeAccess } from './bundles/resume-access/pages/resume-access';
import { StatisticsPage } from './bundles/statistics-page/pages/statistics-page';
import { TemplatePage } from './bundles/templates-page/templates-page';
import { SubscriptionCancel } from './bundles/users/components/subscription-cancel/subscription-cancel';
import { Profile } from './bundles/users/pages/profile';
import { ViewTemplatePage } from './bundles/view-template-page/view-template-page';

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
                                    element: <HeaderWrapper />,
                                    children: [
                                        {
                                            path: AppRoute.ROOT,
                                            element: <GuestRoute />,
                                            children: [
                                                {
                                                    path: AppRoute.LOG_IN,
                                                    element: <Auth />,
                                                },
                                                {
                                                    path: AppRoute.ROOT,
                                                    element: <LandingPage />,
                                                },
                                                {
                                                    path: AppRoute.SIGN_UP,
                                                    element: <Auth />,
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
                                                    path: AppRoute.QA,
                                                    element: (
                                                        <QuestionAndAnswerPage />
                                                    ),
                                                },
                                                {
                                                    path: AppRoute.PROFILE,
                                                    element: <Profile />,
                                                },
                                                {
                                                    path: AppRoute.RESUME,
                                                    element: <ResumePage />,
                                                },
                                                {
                                                    path: `${AppRoute.RESUME_EDIT}/:id`,
                                                    element: <EditResume />,
                                                },
                                                {
                                                    path: AppRoute.RESUME_CREATE,
                                                    element: <CreateResume />,
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
                                                    path: AppRoute.STATISTICS,
                                                    element: <StatisticsPage />,
                                                },
                                                {
                                                    path: `${AppRoute.TEMPLATE}/:id`,
                                                    element: (
                                                        <ViewTemplatePage />
                                                    ),
                                                },
                                                {
                                                    path: `${AppRoute.TEMPLATE_EDITOR}/:id`,
                                                    element: (
                                                        <EditTemplatePage />
                                                    ),
                                                },
                                            ],
                                        },
                                        {
                                            path: AppRoute.PREVIEW,
                                            element: <PreviewPage />,
                                        },
                                        {
                                            path: AppRoute.RESUME_ACCESS,
                                            element: <ResumeAccess />,
                                        },
                                        {
                                            path: AppRoute.PAYMENT,
                                            element: (
                                                <StripeProvider>
                                                    <Payment />
                                                </StripeProvider>
                                            ),
                                        },
                                        {
                                            path: AppRoute.SUBSCRIPTION_CANCEL,
                                            element: <SubscriptionCancel />,
                                        },
                                        {
                                            path: AppRoute.EMAIL_CONFIRMATION,
                                            element: <EmailConfirmationPage />,
                                        },
                                        {
                                            path: AppRoute.EMAIL_CONFIRMATION_FAIL,
                                            element: (
                                                <EmailConfirmationFailPage />
                                            ),
                                        },
                                        {
                                            path: AppRoute.EMAIL_CONFIRMATION_SUCCESS,
                                            element: (
                                                <EmailConfirmationSuccessPage />
                                            ),
                                        },
                                    ],
                                },
                                {
                                    path: AppRoute.PREVIEW,
                                    element: <PreviewPage />,
                                },
                                {
                                    path: AppRoute.RESUME_ACCESS,
                                    element: <ResumeAccess />,
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
