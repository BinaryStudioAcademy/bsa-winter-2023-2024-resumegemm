import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { FileUploadValidationMessage } from 'shared/build/bundles/files/enums/enums.js';
import {
    type ContentType,
    type ValueOf,
    HttpCode,
    HTTPError,
} from 'shared/build/index.js';

import { ControllerHook } from '~/common/controller/enums/controller-hook.enum.js';

type Options = {
    extensions: string[];
};

const fileUpload = fp<Options>((fastify, { extensions }, done) => {
    fastify.decorateRequest('fileBuffer', null);

    fastify.addHook(
        ControllerHook.PRE_VALIDATION,
        async (request: FastifyRequest<{ Body: { file: MultipartFile } }>) => {
            if (!request.isMultipart()) {
                return;
            }

            const { file } = request.body;

            if (file.file.truncated) {
                throw new HTTPError({
                    status: HttpCode.BAD_REQUEST,
                    message: FileUploadValidationMessage.FILE_TOO_LARGE,
                });
            }

            if (!extensions.includes(file.mimetype)) {
                throw new HTTPError({
                    status: HttpCode.BAD_REQUEST,
                    message: FileUploadValidationMessage.INCORRECT_FILE_TYPE,
                });
            }

            const buffer = await file.toBuffer();

            request.fileBuffer = {
                buffer,
                contentType: file.mimetype as ValueOf<typeof ContentType>,
            };
        },
    );

    done();
});

export { fileUpload };
