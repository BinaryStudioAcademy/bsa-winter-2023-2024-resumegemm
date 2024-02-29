import { type OAuth2Namespace } from '@fastify/oauth2';
import {
    type FastifyInstance,
    type FastifyPluginOptions,
    type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import { type ValueOf, OpenAuthApiPath } from 'shared/build/index.js';

import { config } from '~/common/config/config.js';
import { CookieName } from '~/common/controller/enums/enums.js';

const oauthCallbackHandler = fp<FastifyPluginOptions>(
    async (fastify: FastifyInstance): Promise<void> => {
        fastify.get(
            OpenAuthApiPath.REDIRECT_CALLBACK,
            async (request: FastifyRequest, reply) => {
                const { provider: oauthCurrentProvider } =
                    request.params as Record<
                        string,
                        keyof ValueOf<OAuth2Namespace>
                    >;
                const getOauthAccessTokenDependingOnProvider = await fastify[
                    oauthCurrentProvider
                ]?.getAccessTokenFromAuthorizationCodeFlow(request);

                if (getOauthAccessTokenDependingOnProvider) {
                    const {
                        token: { access_token },
                    } = getOauthAccessTokenDependingOnProvider;

                    const getOauthRouteHandlerDependingOnProvider = `/api/v1/oauth/${oauthCurrentProvider}`;

                    return reply
                        .setCookie(CookieName.OAUTH_TOKEN, access_token, {
                            path: OpenAuthApiPath.ROOT,
                            httpOnly: true,
                            maxAge: config.ENV.COOKIE.EXPIRES_IN,
                        })
                        .redirect(getOauthRouteHandlerDependingOnProvider);
                }
            },
        );
        return await Promise.resolve();
    },
);

export { oauthCallbackHandler };
