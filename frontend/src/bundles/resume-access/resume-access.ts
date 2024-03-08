import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ResumeAccessApi } from './resume-access-api.js';

const resumeAccessApi = new ResumeAccessApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { resumeAccessApi };
