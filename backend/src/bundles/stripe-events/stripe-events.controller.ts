import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import {
    Controller,
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '../../common/controller/controller.js';
import { StripeEventsApiPath, StripeEventsHeaders } from './enums/enums.js';
import { type StripeEventsService } from './stripe-events.service.js';
import { type StripeEventsResponseDto } from './types/types.js';

class StripeEventsController extends Controller {
    private stripeEventsService: StripeEventsService;

    public constructor(
        logger: ILogger,
        stripeEventsService: StripeEventsService,
    ) {
        super(logger, StripeEventsApiPath.WEBHOOKS);

        this.stripeEventsService = stripeEventsService;

        this.addRoute({
            path: '',
            method: 'POST',
            handler: (options) => {
                return this.handleStripeWebhook(
                    options as ApiHandlerOptions<{
                        rawBody: string;
                        headers: Record<string, string>;
                    }>,
                );
            },
        });
    }

    private async handleStripeWebhook(
        options: ApiHandlerOptions<{
            rawBody: string;
            headers: Record<string, string>;
        }>,
    ): Promise<ApiHandlerResponse<StripeEventsResponseDto>> {
        const signature: string =
            options.headers[StripeEventsHeaders.STRIPE_SIGNATURE];
        const { rawBody } = options;
        void this.stripeEventsService.handleEvent(rawBody, signature);

        return {
            status: HttpCode.OK,
            payload: await this.stripeEventsService.handleEvent(
                rawBody,
                signature,
            ),
        };
    }
}

export { StripeEventsController };
