import { type FC, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { StorageKey } from '~/framework/storage/storage';

import { type AppRoute } from '../../enums/app-route.enum';
import { type ValueOf } from '../../types/types';

type Properties = {
    redirectPath: ValueOf<typeof AppRoute>;
    children: ReactNode;
};

const PrivateRoute: FC<Properties> = ({ redirectPath, children }) => {
    const data = window.localStorage.getItem(StorageKey.ACCESS_TOKEN);
    if (!data) {
        return <Navigate to={redirectPath} />;
    }

    return <>{children ?? <Outlet />}</>;
};

export { PrivateRoute };
