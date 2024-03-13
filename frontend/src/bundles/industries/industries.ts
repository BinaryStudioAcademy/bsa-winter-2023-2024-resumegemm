import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { IndustriesApi } from './industries-api';

const industriesApi = new IndustriesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { industriesApi };
export { type Industry } from './type/types';
