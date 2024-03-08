import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { OpenAuthApi } from './open-auth-api';

const openAuthApi = new OpenAuthApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { openAuthApi };
