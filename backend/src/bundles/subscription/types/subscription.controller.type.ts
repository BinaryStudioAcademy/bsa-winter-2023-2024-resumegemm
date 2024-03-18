import { type User } from 'shared/build/index.js';

import { type ApiHandlerResponse } from '~/common/controller/controller';

import { type Subscription, type SubscriptionResponseDto } from './types';

interface ISubscriptionController {
    find(options: {
        user: User;
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto>>;
    cancelSubscription(options: {
        params: { id: string };
    }): Promise<ApiHandlerResponse<Subscription>>;
}

export { type ISubscriptionController };
