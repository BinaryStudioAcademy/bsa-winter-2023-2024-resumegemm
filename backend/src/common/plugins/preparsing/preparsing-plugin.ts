import { Readable } from 'node:stream';

import fp from 'fastify-plugin';
import { type HttpError } from 'shared/build';

import { ControllerHook } from '~/common/controller/enums/enums.js';
import { preParsingRoutes } from '~/common/server-application/constants/constants.js';

const preParsing = fp(async (fastify): Promise<void> => {
    fastify.decorateRequest('rawBody', '');

    fastify.addHook(
        ControllerHook.PRE_PARSING,
        async (request, reply, payload) => {
            try {
                const isPreParsingRoute = Object.values(
                    preParsingRoutes,
                ).includes(request.routerPath);

                if (!isPreParsingRoute) {
                    return payload;
                }

                const chunks = [];
                for await (const chunk of payload) {
                    chunks.push(chunk);
                    request.rawBody += chunk.toString();
                }

                return Readable.from(Buffer.concat(chunks));
            } catch (error) {
                const { status, message } = error as HttpError;
                void reply.code(status).send({ status, message });
            }
        },
    );
    return await Promise.resolve();
});

export { preParsing };
