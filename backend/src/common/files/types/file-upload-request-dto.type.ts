import  { type ContentType } from 'shared/src/enums/content-type.enum';
import  { type ValueOf } from 'shared/src/types/value-of.type';

type FileUploadRequestDto = {
  buffer: Buffer;
  fileName: string;
  contentType: ValueOf<typeof ContentType>;
};

export { type FileUploadRequestDto };