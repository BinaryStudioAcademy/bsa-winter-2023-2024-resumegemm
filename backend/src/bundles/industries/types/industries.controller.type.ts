import { type ApiHandlerResponse } from '~/common/controller/controller.js';

import { type Industry } from './types';

type IIndustriesController = {
    findAll(): Promise<ApiHandlerResponse<Industry[]>>;
};

export { type IIndustriesController };
