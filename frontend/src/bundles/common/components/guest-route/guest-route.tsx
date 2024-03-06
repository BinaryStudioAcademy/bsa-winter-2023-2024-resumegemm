import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '~/bundles/common/hooks/hooks';

import { AppRoute } from '../../enums/app-route.enum';

const GuestRoute: FC = () => {
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));

    return user ? <Navigate to={AppRoute.HOME} /> : <Outlet />;
};

export { GuestRoute };
