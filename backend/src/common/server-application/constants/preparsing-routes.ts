import { ApiPath, StripeEventsApiPath } from 'shared/build/index.js';

import { API_PREFIX } from '~/common/server-application/constants/public-routes.js';

const preParsingRoutes = {
    [`${StripeEventsApiPath.WEBHOOKS}`]: `${API_PREFIX}${ApiPath.WEBHOOKS}`,
};

export { preParsingRoutes };
