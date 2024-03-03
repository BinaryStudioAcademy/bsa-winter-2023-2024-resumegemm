import {
    ApiPath,
    AuthApiPath,
    OpenAuthApiPath,
    PaymentApiPath,
    PDFApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${OpenAuthApiPath.REDIRECT_CALLBACK}`]: `${OpenAuthApiPath.REDIRECT_CALLBACK}`,
    [`${OpenAuthApiPath.GITHUB}`]: `${OpenAuthApiPath.GITHUB}`,
    [`${OpenAuthApiPath.GOOGLE}`]: `${OpenAuthApiPath.GOOGLE}`,
    [`${OpenAuthApiPath.FACEBOOK}`]: `${OpenAuthApiPath.FACEBOOK}`,
    [`${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`,
    [`${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GOOGLE}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GOOGLE}`,
    [`${ApiPath.OPEN_AUTH}${OpenAuthApiPath.FACEBOOK}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.FACEBOOK}`,
    [`${ApiPath.OPEN_AUTH}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`,
    [`${PaymentApiPath.PRICES}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.PRICES}`,
    [`${PaymentApiPath.CONFIG}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CONFIG}`,
    [`${PaymentApiPath.CREATE_SUBSCRIPTION}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CREATE_SUBSCRIPTION}`,
    [`${PDFApiPath.GENERATE}`]: `${API_PREFIX}${ApiPath.PDF}${PDFApiPath.GENERATE}`,
    [`${AuthApiPath.FORGOT_PASSWORD}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.FORGOT_PASSWORD}`,
    [`${AuthApiPath.RESET_PASSWORD}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.RESET_PASSWORD}`,
    [`${AuthApiPath.VERIFY_RESET_TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.VERIFY_RESET_TOKEN}`,
};

export { publicRoutes };
