import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller';
import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath } from '~/common/enums/enums.js';
import { type HttpError } from '~/common/http/http.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type UserAuthResponse } from '../users/types/types.js';
import { EmailSubscriptionsApiPath } from './enums/enums.js';
import { type IEmailSubscriptionService } from './types/email-subscription-service.type.js';
import { type EmailSubscription } from './types/types.js';

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

    /**
     * @swagger
     *
     * /api/email-subscriptions/subscribe:
     *  post:
     *     description: Subscribe to email notifications
     *  responses:
     *     200:
     *      description: Successfully subscribed
     *      content:
     *          application/json:
     *           schema:
     *            type: object
     *            properties:
     *             id:
     *              type: string
     *               example: 5f4e3d3e-4e3d-4e3d-4e3d-4e3d3e4e3d4e
     *     400:
     *      description: Bad request
     *      content:
     *          application/json:
     *            schema:
     *               type: object
     *                 properties:
     *                    status:
     *                      type: number
     *                      example: 400
     *                    message:
     *                      type: string
     *                      example: User is already subscribed
     *       500:
     *        description: Internal server error
     */

    private async subscribe(
        options: ApiHandlerOptions<{
            user: UserAuthResponse['user'];
        }>,
    ): Promise<ApiHandlerResponse<EmailSubscription>> {
        try {
            const subscriprion = await this.emailSubscriptionService.subscribe(
                options.user,
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

    /**
     * @swagger
     *
     * /api/email-subscriptions/unsubscribe/{id}:
     *  delete:
     *     description: Unsubscribe from email notifications
     *  parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       schema:
     *         type: string
     *       example: 5f4e3d3e-4e3d-4e3d-4e3d-4e3d3e4e3d4e
     *  responses:
     *     200:
     *      description: Successfully unsubscribed
     *      content:
     *          application/json:
     *           schema:
     *            type: object
     *            properties:
     *             message:
     *              type: string
     *               example: Successfully unsubscribed
     *       500:
     *        description: Internal server error
     */

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
