import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { RecentlyViewedApi } from './recently-viewed-api.js';

const recentlyViewedApi = new RecentlyViewedApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { recentlyViewedApi };
