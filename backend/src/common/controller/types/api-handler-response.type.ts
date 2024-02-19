import { type HttpCode } from '~/common/http/http.js';
import { type ValueOf } from '~/common/types/types.js';

type ApiHandlerResponseStatus = ValueOf<typeof HttpCode>;

type ApiHandlerResponse<T> = {
    status: ApiHandlerResponseStatus;
    payload:
        | T
        | {
              message?: string;
              status?: ApiHandlerResponseStatus;
          };
    contentType?: string;
};

export { type ApiHandlerResponse };
