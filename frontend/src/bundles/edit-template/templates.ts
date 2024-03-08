import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { TemplateApi } from './template-api.js';

const templateApi = new TemplateApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { templateApi };
