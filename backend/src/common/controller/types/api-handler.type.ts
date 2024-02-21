import { type ApiHandlerOptions } from './api-handler-options.type.js';
import { type ApiHandlerResponse } from './api-handler-response.type.js';

type ApiHandler = (
    options: ApiHandlerOptions,
) => ApiHandlerResponse<unknown> | Promise<ApiHandlerResponse<unknown>>;

export { type ApiHandler };
