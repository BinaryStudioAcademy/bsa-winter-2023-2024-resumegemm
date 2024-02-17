import { ApiPath, AuthApiPath } from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    SIGN_IN: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    SIGN_UP: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    TOKEN: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
};

export { publicRoutes };
