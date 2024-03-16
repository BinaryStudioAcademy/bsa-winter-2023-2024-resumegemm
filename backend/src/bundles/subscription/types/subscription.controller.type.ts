import { type ApiHandlerResponse } from '~/common/controller/controller';

import { type SubscriptionResponseDto } from './types';

interface ISubscriptionController {
    find(options: {
        params: { id: string };
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto>>;
}

export { type ISubscriptionController };
