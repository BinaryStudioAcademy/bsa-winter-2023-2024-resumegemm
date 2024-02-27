import {
    ApiPath,
    AuthApiPath,
    IndustriesApiPath,
    PaymentApiPath,
    PDFApiPath,
    RecentlyViewedApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${ApiPath.INDUSTRIES}`]: `${API_PREFIX}${ApiPath.INDUSTRIES}${IndustriesApiPath.ROOT}`,
    [`${PaymentApiPath.PRICES}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.PRICES}`,
    [`${PaymentApiPath.CONFIG}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CONFIG}`,
    [`${PaymentApiPath.CREATE_SUBSCRIPTION}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CREATE_SUBSCRIPTION}`,
    [`${PDFApiPath.GENERATE}`]: `${API_PREFIX}${ApiPath.PDF}${PDFApiPath.GENERATE}`,
    [`${RecentlyViewedApiPath.ID}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ID}`,
    [`${RecentlyViewedApiPath.ROOT}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ROOT}`,
};

export { publicRoutes };
