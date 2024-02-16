import {
    type HttpError,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpResponseDto,
    AuthApiPath,
} from 'shared/build/index.js';

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
}

export { AuthController };
