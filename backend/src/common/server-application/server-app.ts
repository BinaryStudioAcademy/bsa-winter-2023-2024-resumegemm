import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifyExpress from '@fastify/express';
import fastifyMultipart from '@fastify/multipart';
import oauthPlugin from '@fastify/oauth2';
import swagger, { type StaticDocumentSpec } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify, { type FastifyError } from 'fastify';
import { FileUploadValidationRule } from 'shared/build/bundles/files/enums/file-upload.validation-rule.js';
import { AuthApiPath, OpenAuthApiPath } from 'shared/build/index.js';

import { authService } from '~/bundles/auth/auth.js';
import { oauthConfigurations } from '~/bundles/oauth/config/oauth-config.js';
import { userService } from '~/bundles/users/users.js';
import { config, type IConfig } from '~/common/config/config.js';
import { ControllerHook } from '~/common/controller/enums/enums.js';
import { type IDatabase } from '~/common/database/database.js';
import { ServerErrorType } from '~/common/enums/enums.js';
import { type ValidationError } from '~/common/exceptions/exceptions.js';
import { HttpCode, HTTPError } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';
import {
    authorizationPlugin,
    oauthCallbackHandler,
    preParsingPlugin,
} from '~/common/plugins/plugins.js';
import {
    preParsingRoutes,
    publicRoutes,
} from '~/common/server-application/constants/constants.js';
import {
    type ServerCommonErrorResponse,
    type ServerValidationErrorResponse,
    type ValidationSchema,
} from '~/common/types/types.js';

import { fileUpload as fileUploadPlugin } from '../plugins/file-upload/file-upload-plugin.js';
import { resetPasswordLimiter } from '../rate-limit/reset-password.rate-limit.js';
import {
    type IServerApp,
    type IServerAppApi,
} from './interfaces/interfaces.js';
import { type ServerAppRouteParameters } from './types/types.js';

type Constructor = {
    config: IConfig;
    logger: ILogger;
    database: IDatabase;
    apis: IServerAppApi[];
};

class ServerApp implements IServerApp {
    private config: IConfig;

    private logger: ILogger;

    private database: IDatabase;

    private apis: IServerAppApi[];

    private app: ReturnType<typeof Fastify>;

    public constructor({ config, logger, database, apis }: Constructor) {
        this.config = config;
        this.logger = logger;
        this.database = database;
        this.apis = apis;

        this.app = Fastify();
    }

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, handler, validation } = parameters;

        this.app.route({
            url: path,
            method,
            handler,
            schema: {
                body: validation?.body,
            },
        });

        this.logger.info(`Route: ${method as string} ${path} is registered`);
    }

    public addRoutes(parameters: ServerAppRouteParameters[]): void {
        for (const it of parameters) {
            this.addRoute(it);
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((it) => it.routes);
        this.addRoutes(routers);
    }

    public async initMiddlewares(): Promise<void> {
        await Promise.all(
            this.apis.map(async (it) => {
                this.logger.info(
                    `Generate swagger documentation for API ${it.version}`,
                );

                await this.app.register(preParsingPlugin, {
                    preParsingRoutes,
                });
                await this.app.register(fastifyExpress);

                await this.app.use(
                    [
                        publicRoutes[AuthApiPath.VERIFY_RESET_TOKEN],
                        publicRoutes[AuthApiPath.RESET_PASSWORD],
                    ],
                    resetPasswordLimiter,
                );

                await this.app.register(authorizationPlugin, {
                    publicRoutes,
                    userService,
                    authService,
                });

                await this.app.register(cors, {
                    origin: config.ENV.APP.ORIGIN_URL,
                    methods: '*',
                    credentials: true,
                });
                await this.app.register(fastifyCookie, {
                    secret: config.ENV.COOKIE.COOKIE_SECRET,
                    hook: ControllerHook.ON_REQUEST,
                });

                const oauthAvailableProviders = Object.keys(
                    oauthConfigurations,
                ) as (keyof typeof oauthConfigurations)[];

                for (const oauthProvider of oauthAvailableProviders) {
                    const { credentials, scope } =
                        oauthConfigurations[oauthProvider];
                    await this.app.register(oauthPlugin, {
                        name: oauthProvider,
                        credentials,
                        scope,
                        startRedirectPath: `${OpenAuthApiPath.ROOT}${oauthProvider}`,
                        callbackUri: `${config.ENV.OAUTH.BASE_CALLBACK_URI}${oauthProvider}`,
                    });
                }
                await this.app.register(oauthCallbackHandler);
                await this.app.register(fastifyMultipart, {
                    limits: {
                        fileSize: FileUploadValidationRule.MAXIMUM_FILE_SIZE,
                    },
                    attachFieldsToBody: true,
                    throwFileSizeLimit: false,
                });

                await this.app.register(fileUploadPlugin, {
                    extensions:
                        FileUploadValidationRule.UPLOAD_FILE_CONTENT_TYPES as unknown as string[],
                });

                await this.app.register(swagger, {
                    mode: 'static',
                    specification: {
                        document:
                            it.generateDoc() as StaticDocumentSpec['document'],
                    },
                });

                await this.app.register(swaggerUi, {
                    routePrefix: `${it.version}/documentation`,
                });
            }),
        );
    }

    private initValidationCompiler(): void {
        this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
            return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
                return schema.validate(data, {
                    abortEarly: false,
                });
            };
        });
    }

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (error: FastifyError | ValidationError, _request, replay) => {
                if ('isJoi' in error) {
                    this.logger.error(`[Validation Error]: ${error.message}`);

                    for (const it of error.details) {
                        this.logger.error(
                            `[${it.path.toString()}] — ${it.message}`,
                        );
                    }

                    const response: ServerValidationErrorResponse = {
                        errorType: ServerErrorType.VALIDATION,
                        message: error.message,
                        details: error.details.map((it) => ({
                            path: it.path,
                            message: it.message,
                        })),
                    };

                    return replay
                        .status(HttpCode.UNPROCESSED_ENTITY)
                        .send(response);
                }

                if (error instanceof HTTPError) {
                    this.logger.error(
                        `[Http Error]: ${error.status.toString()} – ${
                            error.message
                        }`,
                    );

                    const response: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return replay.status(error.status).send(response);
                }

                this.logger.error(error.message);

                const response: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };

                return replay
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .send(response);
            },
        );
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization…');

        await this.initMiddlewares();

        this.initValidationCompiler();

        this.initErrorHandler();

        this.initRoutes();

        this.database.connect();

        await this.app
            .listen({
                port: this.config.ENV.APP.PORT,
            })
            .catch((error: Error) => {
                this.logger.error(error.message, {
                    cause: error.cause,
                    stack: error.stack,
                });
            });

        this.logger.info(
            `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
                this.config.ENV.APP.ENVIRONMENT as string
            }.`,
        );
    }
}

export { ServerApp };
