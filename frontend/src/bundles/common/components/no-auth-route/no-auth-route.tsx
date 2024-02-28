import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { StorageKey } from '~/framework/storage/storage';

import { AppRoute } from '../../enums/app-route.enum';

const NoAuthRoute: FC = () => {
    const accesToken = window.localStorage.getItem(StorageKey.ACCESS_TOKEN);
    if (accesToken) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return <Outlet />;
};

export { NoAuthRoute };
