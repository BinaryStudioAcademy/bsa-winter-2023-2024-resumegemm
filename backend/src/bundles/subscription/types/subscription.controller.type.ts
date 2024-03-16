import { type User } from 'shared/build/index.js';

import { type ApiHandlerResponse } from '~/common/controller/controller';

import { type SubscriptionResponseDto } from './types';

interface ISubscriptionController {
    find(options: {
        user: User;
    }): Promise<ApiHandlerResponse<SubscriptionResponseDto>>;
}

export { type ISubscriptionController };
