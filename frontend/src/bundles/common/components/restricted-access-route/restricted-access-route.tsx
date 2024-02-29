import { Navigate, Outlet } from 'react-router-dom';

import { DataStatus } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';

import { AppRoute } from '../../enums/app-route.enum';

const RestrictedAccessRoute: React.FC = () => {
    const { user, dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
        user: auth.user,
    }));

    if (
        dataStatus !== DataStatus.FULFILLED &&
        dataStatus !== DataStatus.REJECTED
    ) {
        return null;
    }

    return user ? <Outlet /> : <Navigate to={AppRoute.ROOT} />;
};

export { RestrictedAccessRoute };
