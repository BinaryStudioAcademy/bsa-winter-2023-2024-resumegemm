import {
    ApiPath,
    AuthApiPath,
    OpenAuthApiPath,
    PaymentApiPath,
    PDFApiPath,
    RecentlyViewedApiPath,
    ResumesApiPath,
    StripeEventsApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${RecentlyViewedApiPath.ID}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ID}`,
    [`${RecentlyViewedApiPath.ROOT}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ROOT}`,
    [`${ResumesApiPath.SHARE_ID()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumesApiPath.SHARE_ID()}`,
    [`${ResumesApiPath.ID_SHARE()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumesApiPath.ID_SHARE()}`,
    [`${ResumesApiPath.SHARE_ID_DETAILS()}`]: `${API_PREFIX}${
        ApiPath.RESUMES
    }${ResumesApiPath.SHARE_ID_DETAILS()}`,
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
    [`${StripeEventsApiPath.WEBHOOKS}`]: `${API_PREFIX}${ApiPath.WEBHOOKS}`,
    [`${PDFApiPath.GENERATE}`]: `${API_PREFIX}${ApiPath.PDF}${PDFApiPath.GENERATE}`,
};

export { API_PREFIX, publicRoutes };
