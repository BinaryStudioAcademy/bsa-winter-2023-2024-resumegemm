import { authController } from '~/bundles/auth/auth.js';
import { recentlyViewedController } from '~/bundles/recently-viewed/recently-viewed.js';
import { resumeController } from '~/bundles/resumes/resumes.js';
import { templateController } from '~/bundles/templates/templates.js';
import { userController } from '~/bundles/users/users.js';
import { config } from '~/common/config/config.js';
import { database } from '~/common/database/database.js';
import { logger } from '~/common/logger/logger.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
    'v1',
    config,
    ...authController.routes,
    ...userController.routes,
    ...resumeController.routes,
    ...recentlyViewedController.routes,
    ...templateController.routes,
);
const serverApp = new ServerApp({
    config,
    logger,
    database,
    apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './types/types.js';
