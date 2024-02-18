import { type FastifyRequest } from 'fastify';
import {
    type HttpError,
    type UserAuthResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelation,
    AuthApiPath,
    ExceptionMessage,
} from 'shared/build/index.js';

import { generateToken, getToken } from '~/bundles/auth/helpers/helpers.js';
import {
    type UserSignUpRequestDto,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';

class AuthController extends Controller {
    private authService: AuthService;

    public constructor(logger: ILogger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.login(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });
        this.addRoute({
            path: AuthApiPath.USER,
            method: 'GET',
            handler: (options) =>
                this.getUser(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponse['user'];
                    }>,
                ),
        });
        this.addRoute({
            path: AuthApiPath.TOKEN,
            method: 'GET',
            handler: (options) =>
                this.regenerateToken(
                    options as ApiHandlerOptions<{
                        headers: FastifyRequest['headers'];
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                firstName:
     *                  type string
     *                lastName:
     *                  type string
     *                password:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     *        400:
     *           description: Email taken
     *  /auth/sign-in:
     *      post:
     *       description: Login user
     *       requestBody:
     *          description: User auth data
     *          required: true
     *       content:
     *        application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *       responses:
     *          200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     *        400:
     *           description: User not found
     *        401:
     *          description: Invalid email
     */
    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<UserSignUpResponseDto>> {
        try {
            const payload = await this.authService.signUp(options.body);
            return {
                status: HttpCode.CREATED,
                payload,
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async login(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse<UserSignInResponseDto>> {
        try {
            const payload = await this.authService.login(options.body);
            return {
                status: HttpCode.OK,
                payload,
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private async getUser(
        options: ApiHandlerOptions<{
            user: UserAuthResponse['user'];
        }>,
    ): Promise<ApiHandlerResponse<UserWithProfileRelation>> {
        try {
            const { id } = options.user;
            const payload = await this.authService.getUser(id);
            return {
                status: HttpCode.OK,
                payload,
            };
        } catch (error: unknown) {
            const message = (error as Error).message;
            const status = HttpCode.INTERNAL_SERVER_ERROR;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private regenerateToken({
        headers,
    }: ApiHandlerOptions<{
        headers: FastifyRequest['headers'];
    }>): ApiHandlerResponse<{ accessToken: string }> {
        try {
            const refreshToken = getToken(headers);

            const { id } = this.authService.verifyToken<Record<'id', string>>(
                refreshToken,
                Boolean(refreshToken),
            );

            const accessToken = generateToken({ id });

            return {
                status: HttpCode.OK,
                payload: { accessToken },
            };
        } catch (error: unknown) {
            const { status } = error as HttpError;
            return {
                status,
                payload: {
                    message: ExceptionMessage.INVALID_REFRESH_TOKEN,
                    status,
                },
            };
        }
    }
}

export { AuthController };
