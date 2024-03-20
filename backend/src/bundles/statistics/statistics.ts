import { logger } from '~/common/logger/logger.js';

import { resumeShareService } from '../resume-share/resume-share.js';
import { StatisticsController } from './statistics.controller.js';
import { StatisticsService } from './statistics.service.js';

const statisticsService = new StatisticsService(resumeShareService);

const statisticsController = new StatisticsController(
    logger,
    statisticsService,
);

export { statisticsController, statisticsService };
