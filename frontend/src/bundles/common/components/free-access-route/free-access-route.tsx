import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from 'shared/build';

import { useEffect, useState } from '~/bundles/common/hooks/hooks';
import { storage, StorageKey } from '~/framework/storage/storage';

import { AppRoute } from '../../enums/app-route.enum';

const FreeAccessRoute: FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const cookieAccessToken = getCookie(StorageKey.ACCESS_TOKEN);

    useEffect(() => {
        const getToken = async (): Promise<void> => {
            const token = await storage.get(StorageKey.ACCESS_TOKEN);
            setAccessToken(token);
        };
        void getToken();
    }, []);

    if (accessToken || cookieAccessToken) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return <Outlet />;
};

export { FreeAccessRoute };
