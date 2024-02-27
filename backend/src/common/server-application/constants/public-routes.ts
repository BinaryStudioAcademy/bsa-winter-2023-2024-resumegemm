import {
    ApiPath,
    AuthApiPath,
    OpenAuthApiPath,
    PDFApiPath,
    RecentlyViewedApiPath,
} from 'shared/build/index.js';

const API_PREFIX = '/api/v1';

const publicRoutes = {
    [`${AuthApiPath.SIGN_IN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    [`${AuthApiPath.SIGN_UP}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    [`${AuthApiPath.TOKEN}`]: `${API_PREFIX}${ApiPath.AUTH}${AuthApiPath.TOKEN}`,
    [`${OpenAuthApiPath.REDIRECT_CALLBACK}`]: `${OpenAuthApiPath.REDIRECT_CALLBACK}`,
    [`${OpenAuthApiPath.GITHUB}`]: `${OpenAuthApiPath.GITHUB}`,
    [`${OpenAuthApiPath.GOOGLE}`]: `${OpenAuthApiPath.GOOGLE}`,
    [`${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GITHUB}`,
    [`${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GOOGLE}`]: `${API_PREFIX}${ApiPath.OPEN_AUTH}${OpenAuthApiPath.GOOGLE}`,
    [`${PDFApiPath.GENERATE}`]: `${API_PREFIX}${ApiPath.PDF}${PDFApiPath.GENERATE}`,
    [`${RecentlyViewedApiPath.ID}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ID}`,
    [`${RecentlyViewedApiPath.ROOT}`]: `${API_PREFIX}${ApiPath.RECENTLY_VIEWED}${RecentlyViewedApiPath.ROOT}`,
};

export { publicRoutes };
