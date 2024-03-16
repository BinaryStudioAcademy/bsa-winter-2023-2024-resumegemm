import { type User } from '~/bundles/users/types/types';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPError } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import {
    SubscriptionApiPath,
    SubscriptionErrorMessage,
} from './enums/enums.js';
import { type SubscriptionService } from './subscription.service.js';
import {
    type ISubscriptionController,
    type SubscriptionResponseDto,
} from './types/types.js';

class SubscriptionController
    extends Controller
    implements ISubscriptionController
{
    private subscriptionService: SubscriptionService;

    public constructor(
        logger: ILogger,
        subscriptionService: SubscriptionService,
    ) {
        super(logger, ApiPath.SUBSCRIPTION);
        this.subscriptionService = subscriptionService;
        this.addRoute({
            path: SubscriptionApiPath.ROOT,
            method: 'GET',
            handler: (options) =>
                this.find(options as ApiHandlerOptions<{ user: User }>),
        });
    }

    public async find(
        options: ApiHandlerOptions<{ user: User }>,
    ): Promise<ApiHandlerResponse<SubscriptionResponseDto>> {
        try {
            const userId = options.user.id;
            const subscription = await this.subscriptionService.find(userId);

            if (!subscription) {
                throw new HTTPError({
                    status: HttpCode.BAD_REQUEST,
                    message: SubscriptionErrorMessage.SUBSCRIPTION_NOT_FOUND,
                });
            }

            return {
                status: HttpCode.OK,
                payload: subscription,
            };
        } catch (error) {
            return {
                status: HttpCode.INTERNAL_SERVER_ERROR,
                payload: {
                    message: (error as Error).message,
                },
            };
        }
    }
}

export { SubscriptionController };
