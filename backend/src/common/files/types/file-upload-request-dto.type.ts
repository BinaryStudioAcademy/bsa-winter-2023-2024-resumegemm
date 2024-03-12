import {
    type ContentEncoding,
    type ContentType,
    type ValueOf,
} from 'shared/build/index.js';

type FileUploadRequestDto = {
    buffer: Buffer | string;
    contentType: ValueOf<typeof ContentType>;
    contentEncoding?: ValueOf<typeof ContentEncoding>;
    key?: string;
};

export { type FileUploadRequestDto };
