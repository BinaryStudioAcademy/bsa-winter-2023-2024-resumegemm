import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { store } from '~/framework/store/store';

import { Home } from './bundles/home/pages/home';
import { Templates } from './bundles/home/pages/templates';
import { PreviewPage } from './bundles/preview/preview';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider
                routes={[
                    {
                        path: AppRoute.ROOT,
                        element: <App />,
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
                        ],
                    },
                    {
                        path: '/preview',
                        element: <PreviewPage />,
                        children: [
                            {
                                path: '/home',
                                element: <Home />,
                            },
                            {
                                path: '/templates',
                                element: <Templates />,
                            },
                        ],
                    },
                ]}
            />
        </StoreProvider>
    </StrictMode>,
);
