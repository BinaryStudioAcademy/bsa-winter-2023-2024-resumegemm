import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode, HTTPError } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { SubscriptionApiPath } from './enums/enums.js';
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
            path: SubscriptionApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{ params: { id: string } }>,
                ),
        });
    }

    public async find(
        options: ApiHandlerOptions<{ params: { id: string } }>,
    ): Promise<ApiHandlerResponse<SubscriptionResponseDto>> {
        try {
            const id = options.params.id;
            const subscription = await this.subscriptionService.find(id);

            if (!subscription) {
                throw new HTTPError({
                    status: HttpCode.BAD_REQUEST,
                    message: `Subscription with id ${id} not found`,
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
