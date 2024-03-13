import Cookies from 'js-cookie';

import { useCallback } from '~/bundles/common/hooks/hooks';
import { config } from '~/framework/config/config';
import { CookieName } from '~/helpers/helpers';

type UseRedirectPayload = {
    redirectPath: string;
    subPath: string;
};

type UseRedirectReturn = {
    handleRedirect: () => void;
};

const useRedirect = ({
    redirectPath,
    subPath,
}: UseRedirectPayload): UseRedirectReturn => {
    const handleRedirect = useCallback(() => {
        Cookies.set(CookieName.REDIRECT_PATH, redirectPath);
        window.open(`${config.ENV.APP.DOMAIN_URL}${subPath}`, '_self');
    }, [redirectPath, subPath]);

    return {
        handleRedirect,
    };
};

export { useRedirect };
