import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { type ContentType } from 'shared/src/enums/content-type.enum';
import { type ValueOf } from 'shared/src/types/value-of.type';

import { ControllerHook } from '../../controller/controller.js';
import { FileUploadValidationMessage } from '../../files/enums/file-upload-validation-message.js';
import { FileError } from '../../files/exceptions/file-error.exception.js';
import { HttpCode } from '../../http/http.js';

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
                throw new FileError({
                    status: HttpCode.BAD_REQUEST,
                    message: FileUploadValidationMessage.FILE_TOO_LARGE,
                });
            }

            if (!extensions.includes(file.mimetype)) {
                throw new FileError({
                    status: HttpCode.BAD_REQUEST,
                    message: FileUploadValidationMessage.INCORRECT_FILE_TYPE,
                });
            }

            const buffer = await file.toBuffer();

            request.fileBuffer = {
                buffer,
                contentType: file.mimetype as ValueOf<typeof ContentType>,
                fileName: file.filename,
            };
        },
    );

    done();
});

export { fileUpload };
