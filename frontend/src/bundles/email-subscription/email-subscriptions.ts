import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { EmailSubscriptionsApi } from './email-subscriptions-api';

const emailSubscriptionsApi = new EmailSubscriptionsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { emailSubscriptionsApi };
