import {
    ApiPath,
    AuthApiPath,
    RecentlyViewedApiPath,
    ResumesApiPath,
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
};

export { publicRoutes };
