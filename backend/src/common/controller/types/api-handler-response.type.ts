import {
    type HttpCode,
    type ServerErrorType,
    type ValueOf,
} from 'shared/build/index.js';

type ApiHandlerResponseStatus = ValueOf<typeof HttpCode>;

type ApiHandlerResponse<T> = {
    status: ApiHandlerResponseStatus;
    refreshToken?: string;
    accessToken?: string;
    contentType?: string;
    payload:
        | {
              message?: string;
              status?: ApiHandlerResponseStatus;
              errorType?: ServerErrorType;
          }
        | T;
};

export { type ApiHandlerResponse };
