import cron from 'node-cron';

import { type ILogger } from '~/common/logger/logger.js';

import { SEND_EMAIL_TIME } from '../common/constants.js';
import { CronJobResultMessage } from '../enums/cron-job-result-message.enum.js';
import { type ResumeCountEmailService } from '../resume-count-email-service/resume-count-email-service.js';

class CronJobScheduler {
    private emailSender: ResumeCountEmailService;
    private logger: ILogger;

    public constructor(emailSender: ResumeCountEmailService, logger: ILogger) {
        this.emailSender = emailSender;
        this.logger = logger;
    }

    public start(): cron.ScheduledTask {
        const task: cron.ScheduledTask = cron.schedule(SEND_EMAIL_TIME, () => {
            this.emailSender
                .sendEmails()
                .then(() => {
                    this.logger.info(CronJobResultMessage.SUCCESS);
                })
                .catch((error: Error) => {
                    this.logger.error(CronJobResultMessage.ERROR, {
                        error: error.message,
                    });
                });
        });

        return task;
    }
}

export { CronJobScheduler };
