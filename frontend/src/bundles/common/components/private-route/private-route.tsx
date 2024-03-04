import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { StorageKey } from '~/framework/storage/storage';

import { AppRoute } from '../../enums/app-route.enum';

const PrivateRoute: FC = () => {
    const accessToken = window.localStorage.getItem(StorageKey.ACCESS_TOKEN);
    if (!accessToken) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return <Outlet />;
};

export { PrivateRoute };
