import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { updateAccessToken } from '~/bundles/auth/store/actions';
import { actions as authActions } from '~/bundles/auth/store/auth.store';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { updatePageTab } from '~/bundles/common/helpers/update-page-tab';
import { useAppDispatch } from '~/bundles/common/hooks/use-app-dispatch/use-app-dispatch.hook';
import { StorageKey } from '~/framework/storage/storage';

const App: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [accessToken] = useState(
        localStorage.getItem(StorageKey.ACCESS_TOKEN),
    );

    useEffect(() => {
        void dispatch(authActions.getUser());
    }, [dispatch]);

    useEffect(() => {
        updatePageTab();
    }, [location]);

    useEffect(() => {
        const expirationCheckInterval = setInterval(() => {
            void dispatch(updateAccessToken());
        }, 1000 * 60 * 60 * 23);

        return () => clearInterval(expirationCheckInterval);
    }, [accessToken, dispatch]);

    return <RouterOutlet />;
};

export { App };
