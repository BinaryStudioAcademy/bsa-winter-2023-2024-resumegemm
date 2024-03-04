import { type FastifyReply } from 'fastify';

import { config } from '~/common/config/config.js';
import { CookieName } from '~/common/controller/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';
import { cookieOptions } from '~/common/server-application/constants/constants.js';
import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import { type IController } from './interfaces/interface.js';
import {
    type ApiHandler,
    type ApiHandlerOptions,
    type ControllerRouteParameters,
} from './types/types.js';

class Controller implements IController {
    private logger: ILogger;

    private apiUrl: string;

    public routes: ServerAppRouteParameters[];

    public constructor(logger: ILogger, apiPath: string) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, reply) =>
                this.prepareAndHandleApiRequest(handler, request, reply),
        });
    }

    private async setTokenInCookies({
        reply,
        accessToken,
        refreshToken,
        redirectSubPathCookie,
    }: {
        reply: FastifyReply;
        accessToken?: string;
        refreshToken?: string;
        redirectSubPathCookie?: string;
    }): Promise<void> {
        const { path, maxAge } = cookieOptions;
        if (accessToken) {
            return reply
                .clearCookie(CookieName.OAUTH_TOKEN)
                .setCookie(CookieName.ACCESS_TOKEN, accessToken, {
                    path,
                    maxAge,
                })
                .setCookie(
                    CookieName.REFRESH_TOKEN,
                    refreshToken as string,
                    cookieOptions,
                )
                .redirect(
                    `${config.ENV.APP.ORIGIN_URL}${redirectSubPathCookie}`,
                );
        }
        if (refreshToken) {
            void reply.setCookie(
                CookieName.REFRESH_TOKEN,
                refreshToken,
                cookieOptions,
            );
        }
    }

    private async prepareAndHandleApiRequest(
        apiHandler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        reply: Parameters<ServerAppRouteParameters['handler']>[1],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const requestHandlerOptions = this.handleRequestOptions(request);

        const redirectSubPathCookie =
            request.cookies[CookieName.REDIRECT_PATH] ?? '';

        const { status, payload, refreshToken, accessToken, contentType } =
            await apiHandler(requestHandlerOptions);

        await this.setTokenInCookies({
            reply,
            accessToken,
            refreshToken,
            redirectSubPathCookie,
        });

        if (contentType) {
            void reply.header('Content-Type', contentType);
        }
        return reply.status(status).send(payload);
    }

    private handleRequestOptions(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const { body, query, params, user, headers, cookies } = request;
        const unsignCookie = request.unsignCookie.bind(request);
        return {
            body,
            query,
            params,
            user,
            headers,
            cookies,
            unsignCookie,
        };
    }
}

export { Controller };
