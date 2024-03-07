import { type FastifyRequest } from 'fastify';
import {
    type HTTPError,
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
import { rateLimitConfig } from '~/common/server-application/constants/constants.js';

import { type AuthService } from './auth.service.js';

class AuthController extends Controller {
    private authService: AuthService;

    public constructor(logger: ILogger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            config: {
                ...rateLimitConfig,
            },
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
            config: rateLimitConfig,
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
     * /auth/get-user:
     *   get:
     *     description: Fetch a user's information
     *     parameters:
     *       - name: user
     *         description: The user data
     *         in: query
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Successful operation. Returns user's info.
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                properties:
     *                   message:
     *                      type: object
     *                      $ref: '#/components/schemas/User'
     *       500:
     *         description: Internal server error
     * /auth/regenerate-token:
     *   post:
     *     description: Regenerate a user's access and refresh tokens
     *     parameters:
     *       - name: refreshToken
     *         description: The refresh token cookie
     *         in: cookie
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful operation. Returns regenerated tokens.
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/Tokens'
     *       401:
     *         description: Invalid refresh token
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
            const { message, status } = error as HTTPError;
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
            const { message, status } = error as HTTPError;
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
            const payload = await this.authService.getUserWithProfile(id);
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
            const { status } = error as HTTPError;
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
