import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';
import { storage } from '~/framework/storage/storage.js';

import { PaymentApi } from './payment-api';

const paymentApi = new PaymentApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { paymentApi };
