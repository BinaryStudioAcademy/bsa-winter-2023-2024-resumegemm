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
    StripeProvider
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { store } from '~/framework/store/store';

import { PaymentPage } from './bundles/payment/pages/payment';
import { PreviewPage } from './bundles/preview/preview';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider
                routes={[
                    {
                        path: AppRoute.ROOT,
                        element: (
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                                <App />
                            </ErrorBoundary>
                        ),
                        children: [
                            {
                                path: AppRoute.ROOT,
                                element: 'Root',
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
                                path: AppRoute.PAYMENT,
                                element: <StripeProvider>
                                    <PaymentPage />
                                </StripeProvider>,
                            }
                        ],
                    },
                    {
                        path: AppRoute.PREVIEW,
                        element: <PreviewPage />,
                    },
                ]}
            />
        </StoreProvider>
    </StrictMode>,
);
