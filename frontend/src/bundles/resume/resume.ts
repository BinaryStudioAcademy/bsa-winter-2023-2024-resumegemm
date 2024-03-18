import { ResumeApi } from '~/bundles/resume/resume-api';
import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

const resumeApi = new ResumeApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { resumeApi };
