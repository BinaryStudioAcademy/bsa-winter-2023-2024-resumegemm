import {
    ApiPath,
    AuthApiPath,
    OpenAuthApiPath,
    PaymentApiPath,
    PDFApiPath,
    RecentlyViewedApiPath,
    ResumeApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${RecentlyViewedApiPath.ID}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ID}`,
    [`${RecentlyViewedApiPath.ROOT}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ROOT}`,
    [`${ResumeApiPath.SHARE_ID()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumeApiPath.SHARE_ID()}`,
    [`${ResumeApiPath.ID_SHARE()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumeApiPath.ID_SHARE()}`,
    [`${ResumeApiPath.SHARE_ID_DETAILS()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumeApiPath.SHARE_ID_DETAILS()}`,
    [`${OpenAuthApiPath.REDIRECT_CALLBACK}`]: `${OpenAuthApiPath.REDIRECT_CALLBACK}`,
    [`${OpenAuthApiPath.GITHUB}`]: `${OpenAuthApiPath.GITHUB}`,
    [`${ApiPath.OPEN_AUTH}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`,
    [`${PaymentApiPath.PRICES}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.PRICES}`,
    [`${PaymentApiPath.CONFIG}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CONFIG}`,
    [`${PaymentApiPath.CREATE_SUBSCRIPTION}`]: `${API_PREFIX}${ApiPath.PAYMENT}${PaymentApiPath.CREATE_SUBSCRIPTION}`,
    [`${PDFApiPath.GENERATE}`]: `${API_PREFIX}${ApiPath.PDF}${PDFApiPath.GENERATE}`,
};

export { publicRoutes };
