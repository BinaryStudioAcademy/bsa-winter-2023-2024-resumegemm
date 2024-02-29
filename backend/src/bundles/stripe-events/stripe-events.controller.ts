import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '../../common/controller/controller.js';
import { StripeEventsApiPath } from './enums/enums.js';
import { type StripeEventsService } from './stripe-events.service.js';
import {
    type StripeEventsRequestDto,
    type StripeEventsResponseDto,
} from './types/types.js';

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
            handler: (options) =>
                this.handleEvent(
                    options as ApiHandlerOptions<{
                        body: StripeEventsRequestDto;
                        headers: Record<string, string>;
                    }>,
                ),
        });
    }

    private handleEvent(
        options: ApiHandlerOptions<{
            body: StripeEventsRequestDto;
            headers: Record<string, string>;
        }>,
    ): ApiHandlerResponse<StripeEventsResponseDto> {
        return {
            status: HttpCode.OK,
            payload: this.stripeEventsService.handleEvent(options.body),
        };
    }
}

export { StripeEventsController };
