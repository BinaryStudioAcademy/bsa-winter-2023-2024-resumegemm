import { type FastifyRequest } from 'fastify';

import {
    generateRefreshToken,
    generateToken,
    verifyToken,
} from '~/bundles/auth/helpers/helpers.js';
import { type OauthService } from '~/bundles/oauth/oauth.service.js';
import {
    type HTTPError,
    type OauthConnectionEntityFields,
    type OauthUserLoginRequestDto,
    type UserFacebookDataResponseDto,
    type UserGithubDataResponseDto,
    type UserGoogleDataResponseDto,
    type UserLinkedInDataResponseDto,
    type ValueOf,
} from '~/bundles/oauth/types/types.js';
import { type HttpApi } from '~/common/api/types/http-api.type.js';
import { config } from '~/common/config/config.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { CookieName } from '~/common/controller/enums/enums.js';
import { type ILogger } from '~/common/logger/interfaces/logger.interface.js';

import {
    ApiPath,
    HttpCode,
    OauthStrategy,
    OpenAuthApiGetUserUrl,
    OpenAuthApiPath,
} from './enums/enums.js';

type Constructor = {
    logger: ILogger;
    oauthService: OauthService;
    httpService: HttpApi;
};

class OpenAuthController extends Controller {
    private oauthService: OauthService;
    private httpService: HttpApi;

    public constructor({ logger, oauthService, httpService }: Constructor) {
        super(logger, ApiPath.OPEN_AUTH);

        this.oauthService = oauthService;
        this.httpService = httpService;

        this.addRoute({
            path: OpenAuthApiPath.GITHUB,
            method: 'GET',
            handler: (options) =>
                this.handleGithubAuth(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                    }>,
                ),
        });
        this.addRoute({
            path: OpenAuthApiPath.GOOGLE,
            method: 'GET',
            handler: (options) =>
                this.handleGoogleAuth(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                    }>,
                ),
        });
        this.addRoute({
            path: OpenAuthApiPath.FACEBOOK,
            method: 'GET',
            handler: (options) =>
                this.handleFacebookAuth(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                    }>,
                ),
        });
        this.addRoute({
            path: OpenAuthApiPath.LINKEDIN,
            method: 'GET',
            handler: (options) =>
                this.handleLinkedInAuth(
                    options as ApiHandlerOptions<{
                        cookies: FastifyRequest['cookies'];
                    }>,
                ),
        });
        this.addRoute({
            path: OpenAuthApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.deleteById(
                    options as ApiHandlerOptions<{
                        params: FastifyRequest['params'];
                    }>,
                ),
        });
    }

    /**
     * @swagger
     *
     * /oauth/github:
     *   get:
     *     description: Authentication handler for Github OAuth
     *     parameters:
     *       - name: OAUTH_TOKEN
     *         description: The OAuth token provided by Github
     *         in: cookie
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       201:
     *         description: Successful Github authentication. Returns an access token.
     *         headers:
     *           Set-Cookie:
     *             schema:
     *               type: string
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 accessToken:
     *                   type: string
     *       500:
     *         description: Invalid authentication request.
     */

    private async handleFacebookAuth({
        cookies,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
    }>): Promise<ApiHandlerResponse<unknown>> {
        const oauthToken = cookies[CookieName.OAUTH_TOKEN] as string;

        const accessToken = cookies[CookieName.ACCESS_TOKEN];

        const userId = this.verifyTokenAndGetUserId(
            accessToken as string,
        ) as string;

        const {
            email,
            id,
            picture: {
                data: { url },
            },
            name,
            last_name,
        }: UserFacebookDataResponseDto = await this.requestOAuthProviderUserData(
            OpenAuthApiGetUserUrl.FACEBOOK,
            oauthToken,
        );
        return await this.createUser({
            email,
            firstName: name,
            avatar: url,
            oauthId: id,
            lastName: last_name,
            oauthStrategy: OauthStrategy.FACEBOOK,
            userId,
        });
    }

    private async handleGithubAuth({
        cookies,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
    }>): Promise<ApiHandlerResponse<unknown>> {
        const oauthToken = cookies[CookieName.OAUTH_TOKEN] as string;

        const accessToken = cookies[CookieName.ACCESS_TOKEN];

        const userId = this.verifyTokenAndGetUserId(
            accessToken as string,
        ) as string;

        const { email, id, name, avatar_url }: UserGithubDataResponseDto =
            await this.requestOAuthProviderUserData(
                OpenAuthApiGetUserUrl.GITHUB,
                oauthToken,
            );

        return await this.createUser({
            email,
            firstName: name,
            lastName: null,
            avatar: avatar_url,
            oauthId: String(id),
            oauthStrategy: OauthStrategy.GITHUB,
            userId,
        });
    }

    private async handleGoogleAuth({
        cookies,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
    }>): Promise<ApiHandlerResponse<null>> {
        const oauthToken = cookies[CookieName.OAUTH_TOKEN] as string;
        const accessToken = cookies[CookieName.ACCESS_TOKEN];

        const userId = this.verifyTokenAndGetUserId(
            accessToken as string,
        ) as string;

        const {
            id,
            email,
            picture,
            given_name,
            family_name,
        }: UserGoogleDataResponseDto = await this.requestOAuthProviderUserData(
            OpenAuthApiGetUserUrl.GOOGLE,
            oauthToken,
        );
        return await this.createUser({
            email,
            firstName: given_name,
            lastName: family_name,
            avatar: picture,
            oauthId: id,
            oauthStrategy: OauthStrategy.GOOGLE,
            userId,
        });
    }

    private async handleLinkedInAuth({
        cookies,
    }: ApiHandlerOptions<{
        cookies: FastifyRequest['cookies'];
    }>): Promise<ApiHandlerResponse<null>> {
        const oauthToken = cookies[CookieName.OAUTH_TOKEN] as string;
        const accessToken = cookies[CookieName.ACCESS_TOKEN];

        const userId = this.verifyTokenAndGetUserId(
            accessToken as string,
        ) as string;

        const {
            sub: id,
            email,
            picture: avatar,
            given_name: firstName,
            family_name: lastName,
        }: UserLinkedInDataResponseDto = await this.requestOAuthProviderUserData(
            OpenAuthApiGetUserUrl.LINKEDIN,
            oauthToken,
        );

        return await this.createUser({
            email,
            firstName,
            lastName,
            avatar,
            oauthId: id,
            oauthStrategy: OauthStrategy.LINKEDIN,
            userId,
        });
    }

    private async createUser(
        userPayload: OauthUserLoginRequestDto,
    ): Promise<ApiHandlerResponse<null>> {
        try {
            const user = await this.oauthService.create(userPayload);
            return {
                accessToken: generateToken({ id: user.id }),
                refreshToken: generateRefreshToken({ id: user.id }),
                status: HttpCode.OK,
                payload: null,
            };
        } catch (error: unknown) {
            const { message, status = HttpCode.INTERNAL_SERVER_ERROR } =
                error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status,
                },
            };
        }
    }

    private verifyTokenAndGetUserId(token: string): string | null {
        return token
            ? (
                  verifyToken(
                      token,
                      config.ENV.JWT.ACCESS_TOKEN_SECRET,
                  ) as Record<'id', string>
              ).id
            : null;
    }

    private async requestOAuthProviderUserData<T>(
        providerUrl: ValueOf<typeof OpenAuthApiGetUserUrl>,
        token: string,
    ): Promise<T> {
        return (await this.httpService.load(providerUrl, {
            token,
        })) as T;
    }

    private async deleteById({
        params,
    }: ApiHandlerOptions<{
        params: FastifyRequest['params'];
    }>): Promise<ApiHandlerResponse<boolean>> {
        try {
            const id = (params as OauthConnectionEntityFields).id;
            const hasConnectionRemoved = await this.oauthService.deleteById(id);
            return {
                status: HttpCode.OK,
                payload: hasConnectionRemoved,
            };
        } catch (error: unknown) {
            const { message, status } = error as HTTPError;
            return {
                status,
                payload: {
                    message,
                    status: HttpCode.INTERNAL_SERVER_ERROR,
                },
            };
        }
    }
}

export { OpenAuthController };
