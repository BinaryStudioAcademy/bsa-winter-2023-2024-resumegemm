import { OpenAuthController } from '~/bundles/oauth/oauth.controller.js';
import { OauthModel } from '~/bundles/oauth/oauth.model.js';
import { OauthRepository } from '~/bundles/oauth/oauth.repository.js';
import { OauthService } from '~/bundles/oauth/oauth.service.js';
import { userService } from '~/bundles/users/users.js';
import { httpApi } from '~/common/api/api.js';
import { logger } from '~/common/logger/logger.js';

const openAuthRepository = new OauthRepository({
    oauthModel: OauthModel,
});
const openAuthService = new OauthService(openAuthRepository, userService);
const openAuthController = new OpenAuthController(
    logger,
    openAuthService,
    httpApi,
);

export { openAuthController, openAuthRepository, openAuthService };
