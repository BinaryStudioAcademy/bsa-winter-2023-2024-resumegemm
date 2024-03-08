import { CookieName, setCookie } from 'shared/build';

import { useCallback } from '~/bundles/common/hooks/hooks';
import { config } from '~/framework/config/config';

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
        setCookie(CookieName.REDIRECT_PATH, redirectPath);
        window.open(`${config.ENV.APP.DOMAIN_URL}${subPath}`, '_self');
    }, [redirectPath, subPath]);

    return {
        handleRedirect,
    };
};

export { useRedirect };
