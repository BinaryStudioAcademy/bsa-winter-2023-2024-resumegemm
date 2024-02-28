import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    ErrorFallback,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { ToastProvider } from '~/bundles/toast/components/toast-provider';
import { store } from '~/framework/store/store';

import { LandingPage } from './bundles/landing-page/landing-page';
import { NotFoundPage } from './bundles/not-found-page/not-found-page';
import { PreviewPage } from './bundles/preview/preview';
import { ResumeAccess } from './bundles/resume-access/pages/resume-access';
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
                                    element: <LandingPage />,
                                },
                                {
                                    path: AppRoute.SIGN_IN,
                                    element: <Auth />,
                                },
                                {
                                    path: AppRoute.SIGN_UP,
                                    element: <Auth />,
                                },
                                {
                                    path: AppRoute.PROFILE,
                                    element: <Profile />,
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
                        {
                            path: AppRoute.PREVIEW,
                            element: <PreviewPage />,
                        },
                    ]}
                />
            </ToastProvider>
        </StoreProvider>
    </StrictMode>,
);
