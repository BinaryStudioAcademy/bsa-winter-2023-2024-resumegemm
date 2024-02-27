import { type FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
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

import {
    generateRefreshToken,
    generateToken,
} from '~/bundles/auth/helpers/helpers.js';
import { userService } from '~/bundles/users/users.js';
import {
    type UserSignUpRequestDto,
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import { config } from '~/common/config/config.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { CookieName } from '~/common/controller/enums/enums.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type AuthService } from './auth.service.js';

interface JwtPayload {
    email: string;
    id: string;
}

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
                        cookies: FastifyRequest['cookies'];
                    }>,
                ),
        });
        this.addRoute({
            path: AuthApiPath.TOKEN,
            method: 'GET',
            handler: (options) =>
                this.regenerateToken(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                        unsignCookie: FastifyRequest['unsignCookie'];
                    }>,
                ),
        });
        this.addRoute({
            path: AuthApiPath.CONFIRM_EMAIL,
            method: 'GET',
            handler: (options) =>
                this.confirmEmail(
                    options as ApiHandlerOptions<{
                        query: { token: string };
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
        const token = await this.authService.signUp(options.body);

        return {
            status: HttpCode.CREATED,
            payload: token,
        };
    }

    private async login(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<
        ApiHandlerResponse<Omit<UserSignInResponseDto, 'refreshToken'>>
    > {
        try {
            const { refreshToken, ...userData } = await this.authService.login(
                options.body,
            );
            return {
                refreshToken,
                status: HttpCode.OK,
                payload: userData,
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
        cookies,
        unsignCookie,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
        unsignCookie: FastifyRequest['unsignCookie'];
    }>): ApiHandlerResponse<{ accessToken: string }> {
        try {
            const unsignedCookie = unsignCookie(
                cookies[CookieName.REFRESH_TOKEN] as NonNullable<string>,
            );
            const oldRefreshToken = unsignedCookie.value as string;

            const { id } = this.authService.verifyToken<Record<'id', string>>(
                oldRefreshToken,
                config.ENV.JWT.REFRESH_TOKEN_SECRET,
            );

            const accessToken = generateToken({ id });
            const refreshToken = generateRefreshToken({ id });
            return {
                refreshToken,
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

    private async confirmEmail(
        options: ApiHandlerOptions<{ query: { token: string } }>,
    ): Promise<ApiHandlerResponse<{ message: string }>> {
        try {
            const { token } = options.query;
            const decodedToken = jwt.verify(
                token,
                config.ENV.JWT.ACCESS_TOKEN_SECRET,
            ) as JwtPayload;
            // Call confirmUserEmail function with the decoded token
            await userService.confirmUserEmail(decodedToken);

            return {
                status: HttpCode.OK,
                payload: { message: 'Email confirmed successfully' },
            };
        } catch (error: unknown) {
            const { status } = error as HttpError;
            return {
                status,
                payload: {
                    message: ExceptionMessage.USER_NOT_FOUND,
                    status,
                },
            };
        }
    }
}

export { AuthController };
