import { useCallback } from 'react';
import { matchPath, Outlet, useLocation } from 'react-router-dom';

import { type AppRoute } from '../../enums/app-route.enum';
import { AvatarHeader } from './components/avatar-header/avatar-header';
import { GetStartedHeader } from './components/get-started-header/get-started-header';
import { ResumesHeader } from './components/resumes-header/resumes-header';
import { AvatarHeaderRoutes } from './constants/avatar-header-routes';
import { GetStartedHeaderRoutes } from './constants/get-started-header-routes';
import { NoHeaderRoutes } from './constants/no-header-routes';
import { ResumesHeaderRoutes } from './constants/resumes-header-routes';

const HeaderWrapper: React.FC = () => {
    const location = useLocation();

    const handleHeader = useCallback(() => {
        if (
            NoHeaderRoutes.some((route) =>
                matchPath(route, location.pathname as AppRoute),
            )
        ) {
            return;
        }

        if (
            GetStartedHeaderRoutes.some((route) =>
                matchPath(route, location.pathname as AppRoute),
            )
        ) {
            return <GetStartedHeader />;
        }

        if (
            AvatarHeaderRoutes.some((route) =>
                matchPath(route, location.pathname as AppRoute),
            )
        ) {
            return <AvatarHeader />;
        }

        if (
            ResumesHeaderRoutes.some((route) =>
                matchPath(route, location.pathname as AppRoute),
            )
        ) {
            return <ResumesHeader />;
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
