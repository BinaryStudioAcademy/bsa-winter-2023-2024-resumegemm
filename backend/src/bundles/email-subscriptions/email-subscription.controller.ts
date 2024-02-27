import { type EmailSubscription, type HttpError } from 'shared/build/index.js';
import { ApiPath } from 'shared/build/index.js';

import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';
import { Controller } from '~/common/controller/controller.package.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type UserAuthResponse } from '../users/types/types.js';
import { EmailSubscriptionsApiPath } from './enums/enums.js';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type.js';

class EmailSubscriptionController extends Controller {
    public constructor(
        logger: ILogger,
        public emailSubscriptionService: IEmailSubscriptionService,
    ) {
        super(logger, ApiPath.EMAIL_SUBSCRIPTIONS);
        this.addRoute({
            path: EmailSubscriptionsApiPath.SUBSCRIBE,
            method: 'POST',
            handler: (options) =>
                this.subscribe(
                    options as ApiHandlerOptions<{
                        user: UserAuthResponse['user'];
                    }>,
                ),
        });
        this.addRoute({
            path: EmailSubscriptionsApiPath.UNSUBSCRIBE,
            method: 'DELETE',
            handler: (options) =>
                this.unsubscribe(
                    options as ApiHandlerOptions<{
                        params: {
                            id: string;
                        };
                    }>,
                ),
        });
    }

    private async subscribe(
        options: ApiHandlerOptions<{
            user: UserAuthResponse['user'];
        }>,
    ): Promise<ApiHandlerResponse<EmailSubscription>> {
        try {
            const subscriprion = await this.emailSubscriptionService.subscribe(
                options.user.id,
            );
            return {
                status: HttpCode.OK,
                payload: subscriprion,
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status: status,
                payload: {
                    status: status,
                    message: message,
                },
            };
        }
    }

    private async unsubscribe(
        options: ApiHandlerOptions<{
            params: {
                id: string;
            };
        }>,
    ): Promise<ApiHandlerResponse<void>> {
        try {
            await this.emailSubscriptionService.unsubscribe(options.params.id);
            return {
                status: HttpCode.OK,
                payload: {
                    message: 'Successfully unsubscribed',
                },
            };
        } catch (error: unknown) {
            const { message, status } = error as HttpError;
            return {
                status: status,
                payload: {
                    status: status,
                    message: message,
                },
            };
        }
    }
}

export { EmailSubscriptionController };
