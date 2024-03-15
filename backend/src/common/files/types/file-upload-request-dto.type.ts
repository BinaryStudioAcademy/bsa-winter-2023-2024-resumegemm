import { type ContentEncoding } from 'shared/src/enums/content-encoding.enum';
import { type ContentType } from 'shared/src/enums/content-type.enum';
import { type ValueOf } from 'shared/src/types/value-of.type';

type FileUploadRequestDto = {
    buffer: Buffer | string;
    contentType: ValueOf<typeof ContentType>;
    contentEncoding?: ValueOf<typeof ContentEncoding>;
    key?: string;
};

export { type FileUploadRequestDto };
