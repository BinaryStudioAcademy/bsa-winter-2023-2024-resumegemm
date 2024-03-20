import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { StatisticsApi } from './statistics-api';

const statisticsApi = new StatisticsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { statisticsApi };
