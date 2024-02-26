import {
    ApiPath,
    AuthApiPath,
    EmailSubscriptionsApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${EmailSubscriptionsApiPath.UNSUBSCRIBE}`]: `${API_PREFIX}${ApiPath.EMAIL_SUBSCRIPTIONS}${EmailSubscriptionsApiPath.UNSUBSCRIBE}`,
};

export { publicRoutes };
