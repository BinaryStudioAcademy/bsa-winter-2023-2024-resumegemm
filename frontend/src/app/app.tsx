import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { actions as authActions } from '~/bundles/auth/store/auth.store';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { updatePageTab } from '~/bundles/common/helpers/update-page-tab';
import { useAppDispatch } from '~/bundles/common/hooks/use-app-dispatch/use-app-dispatch.hook';

const App: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(authActions.getUser());
    }, [dispatch]);

    useEffect(() => {
        updatePageTab();
    }, [location]);

    return <RouterOutlet />;
};

export { App };
