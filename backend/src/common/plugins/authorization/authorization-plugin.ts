import fp from 'fastify-plugin';
import {
    type AuthApiPath,
    type HttpError,
    HttpHeader,
} from 'shared/build/index.js';

import { type AuthService } from '~/bundles/auth/auth.service';
import { ControllerHook } from '~/common/controller/enums/enums.js';
import { type IService } from '~/common/interfaces/service.interface';

type AuthorizationPluginPayload = {
    publicRoutes: Partial<Record<AuthApiPath, string>>;
    userService: IService;
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
                const token = (
                    request.headers[HttpHeader.AUTHORIZATION] as string
                ).split(' ')[1];

                const { id } =
                    authService.verifyToken<Record<'id', string>>(token);

                const authorizedUser = await userService.getUserWithProfile(id);
                request.user = authorizedUser;
            } catch (error) {
                const { status, message } = error as HttpError;
                void reply.code(status).send({ status, message });
            }
        });
        return await Promise.resolve();
    },
);

export { authorization };
