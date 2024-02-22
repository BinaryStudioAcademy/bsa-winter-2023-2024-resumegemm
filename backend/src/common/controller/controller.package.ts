import { config } from '~/common/config/config.js';
import { CookieName } from '~/common/controller/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';
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

    private async prepareAndHandleApiRequest(
        apiHandler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        reply: Parameters<ServerAppRouteParameters['handler']>[1],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const requestHandlerOptions = this.handleRequestOptions(request);

        const { status, payload, refreshToken } = await apiHandler(
            requestHandlerOptions,
        );
        if (refreshToken) {
            void reply.setCookie(CookieName.REFRESH_TOKEN, refreshToken, {
                path: '/',
                httpOnly: true,
                maxAge: config.ENV.COOKIE.EXPIRES_IN,
                signed: true,
            });
        }
        return reply.status(status).send(payload);
    }

    private handleRequestOptions(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const { body, query, params, user, fileBuffer, headers, cookies } =
            request;
        const unsignCookie = request.unsignCookie.bind(request);
        return {
            body,
            query,
            fileBuffer,
            params,
            user,
            headers,
            cookies,
            unsignCookie,
        };
    }
}

export { Controller };
