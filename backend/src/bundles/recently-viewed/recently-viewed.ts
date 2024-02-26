import { logger } from '~/common/logger/logger.js';

import { RecentlyViewedController } from './recently-viewed.controller.js';
import { RecentlyViewedModel } from './recently-viewed.model.js';
import { RecentlyViewedRepository } from './recently-viewed.repository.js';
import { RecentlyViewedService } from './recently-viewed.service.js';

const recentlyViewedRepository = new RecentlyViewedRepository(
    RecentlyViewedModel,
);

const recentlyViewedService = new RecentlyViewedService(
    recentlyViewedRepository,
);

const recentlyViewedController = new RecentlyViewedController(
    logger,
    recentlyViewedService,
);

export { recentlyViewedController, recentlyViewedService };
export { RecentlyViewedModel } from './recently-viewed.model.js';
