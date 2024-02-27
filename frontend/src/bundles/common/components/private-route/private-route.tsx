import { type FC, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { type AppRoute } from '../../enums/app-route.enum';
import { type ValueOf } from '../../types/types';

type Properties = {
    redirectPath: ValueOf<typeof AppRoute>;
    children: ReactNode;
    statement: boolean;
};

const PrivateRoute: FC<Properties> = ({
    redirectPath,
    children,
    statement,
}) => {
    if (!statement) {
        return <Navigate to={redirectPath} />;
    }

    return <>{children ?? <Outlet />}</>;
};

export { PrivateRoute };
