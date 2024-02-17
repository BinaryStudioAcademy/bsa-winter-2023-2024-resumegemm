import fp from 'fastify-plugin';
import {
    ExceptionMessage,
    HttpCode,
    HttpError,
    HttpHeader,
} from 'shared/build/index.js';

import { type AuthService } from '~/bundles/auth/auth.service';
import { ControllerHook } from '~/common/controller/enums/enums.js';
import { type IService } from '~/common/interfaces/service.interface';

type AuthorizationPayload = {
    publicRoutes: object;
    userService: IService;
    authService: AuthService;
};

const authorization = fp<AuthorizationPayload>(
    (fastify, { publicRoutes, authService, userService }): void => {
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

                if (!id) {
                    throw new HttpError({
                        message: ExceptionMessage.INVALID_TOKEN,
                        status: HttpCode.UNAUTHORIZED,
                    });
                }
                const authorizedUser = await userService.getUserWithProfile(id);
                request.user = authorizedUser;
            } catch (error) {
                void reply.code(HttpCode.UNAUTHORIZED).send(error);
            }
        });
    },
);

export { authorization };
