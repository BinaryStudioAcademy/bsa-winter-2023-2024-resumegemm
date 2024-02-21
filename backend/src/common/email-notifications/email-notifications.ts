import { recentlyViewedService } from '~/bundles/recently-viewed/recently-viewed.js';
import { userService } from '~/bundles/users/users.js';

import { Logger } from '../logger/logger.package.js';
import { CronJobScheduler } from './cron-job-sceduler/cron-job-scheduler.js';
import { ResumeCountEmailService } from './resume-count-email-service/resume-count-email-service.js';

const resumeCountEmailSenderService = new ResumeCountEmailService(
    recentlyViewedService,
    userService,
);

const logger = new Logger();
const cronJobScheduler = new CronJobScheduler(
    resumeCountEmailSenderService,
    logger,
);

export { cronJobScheduler };
