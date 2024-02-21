import { cronJobScheduler } from '~/common/email-notifications/email-notifications.js';
import { serverApp } from '~/common/server-application/server-application.js';

cronJobScheduler.start();

await serverApp.init();
