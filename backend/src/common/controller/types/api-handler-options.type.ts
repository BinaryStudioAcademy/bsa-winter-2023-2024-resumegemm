import  { type FileUploadRequestDto } from '~/common/files/types/file-upload-request-dto';

type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    fileBuffer?: FileUploadRequestDto
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    fileBuffer: T['fileBuffer']
};

export { type ApiHandlerOptions };
