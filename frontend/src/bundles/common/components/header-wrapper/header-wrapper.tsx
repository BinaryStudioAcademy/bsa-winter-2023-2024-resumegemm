import { useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { type AppRoute } from '../../enums/app-route.enum';
import { AvatarHeader } from './components/avatar-header/avatar-header';
import { GetStartedHeader } from './components/get-started-header/get-started-header';
import { GetStartedHeaderRoutes } from './constants/get-started-header-routes';
import { NoHeaderRoutes } from './constants/no-header-routes';

const HeaderWrapper: React.FC = () => {
    const location = useLocation();

    const handleHeader = useCallback(() => {
        if (NoHeaderRoutes.includes(location.pathname as AppRoute)) {
            return;
        }

        if (GetStartedHeaderRoutes.includes(location.pathname as AppRoute)) {
            return <GetStartedHeader />;
        }

        return <AvatarHeader />;
    }, [location]);

    return (
        <>
            {handleHeader()}
            <Outlet />
        </>
    );
};

export { HeaderWrapper };
