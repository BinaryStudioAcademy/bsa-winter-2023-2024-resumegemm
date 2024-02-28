import fp from 'fastify-plugin';
import {
    type AuthApiPath,
    type HttpError,
    AuthException,
} from 'shared/build/index.js';

import { type AuthService } from '~/bundles/auth/auth.service.js';
import { getToken } from '~/bundles/auth/helpers/helpers.js';
import { openAuthService } from '~/bundles/oauth/oauth.js';
import { config } from '~/common/config/config.js';
import { ControllerHook } from '~/common/controller/enums/enums.js';
import { type IService } from '~/common/interfaces/service.interface.js';

type AuthorizationPluginPayload = {
    publicRoutes: Partial<Record<AuthApiPath, string>>;
    userService: Omit<IService, 'getById'>;
    authService: AuthService;
};

const authorization = fp<AuthorizationPluginPayload>(
    async (
        fastify,
        { publicRoutes, authService, userService },
    ): Promise<void> => {
        fastify.decorateRequest('user', null);

        fastify.addHook(ControllerHook.ON_REQUEST, async (request, reply) => {
            try {
                const isPublicRoute = Object.values(publicRoutes).includes(
                    request.routerPath,
                );

                if (isPublicRoute) {
                    return;
                }

                const token = getToken(request.headers);

                if (!token) {
                    throw new AuthException();
                }

                const { id } = authService.verifyToken<Record<'id', string>>(
                    token,
                    config.ENV.JWT.ACCESS_TOKEN_SECRET,
                );
                const currentUser = await userService.getUserWithProfile(id);

                if (!currentUser) {
                    const oauthUser = await openAuthService.getById(id);
                    request.user = oauthUser;
                    return;
                }

                request.user = currentUser;
            } catch (error) {
                const { status, message } = error as HttpError;
                void reply.code(status).send({ status, message });
            }
        });
        return await Promise.resolve();
    },
);

export { authorization };
