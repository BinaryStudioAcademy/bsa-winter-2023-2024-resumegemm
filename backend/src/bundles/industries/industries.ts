import { logger } from '~/common/logger/logger.js';

import { IndustriesController } from './industries.controller.js';
import { IndustriesModel } from './industries.model.js';
import { IndustriesRepository } from './industries.repository.js';
import { IndustriesService } from './industries.service.js';

const industriesRepository = new IndustriesRepository(IndustriesModel);
const industriesService = new IndustriesService(industriesRepository);
const industriesController = new IndustriesController(
    logger,
    industriesService,
);

export { industriesController, industriesService };
export { IndustriesModel } from './industries.model.js';
