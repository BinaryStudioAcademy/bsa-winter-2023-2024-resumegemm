import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { ProfileApi } from './profile-api';

const profileApi = new ProfileApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { profileApi };
