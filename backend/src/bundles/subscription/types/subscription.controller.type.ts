import { type User } from 'shared/build/index.js';

import { type ApiHandlerResponse } from '~/common/controller/controller';

import {
    type Subscription,
    type SubscriptionResponseDto,
    type SubscriptionWithPlan,
} from './types';

interface ISubscriptionController {
    find(options: {
        user: User;
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto | null>>;
    cancelSubscription(options: {
        params: { id: string };
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto>>;
    keepSubscription(options: {
        params: { id: string };
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto>>;
}

export { type ISubscriptionController };
