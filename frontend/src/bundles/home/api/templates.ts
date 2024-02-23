import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { TemplatesApi } from './templates-api.js';

const templatesApi = new TemplatesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { templatesApi };
