import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { PaymentApiPath } from './enums/enums.js';
import { type PaymentService } from './payment.service.js';
import { type CreateSubscriptionRequestDto } from './types/types.js';

class PaymentController extends Controller {
    private paymentService: PaymentService;

    public constructor(logger: ILogger, paymentService: PaymentService) {
        super(logger, ApiPath.PAYMENT);

        this.paymentService = paymentService;

        this.addRoute({
            path: PaymentApiPath.CONFIG,
            method: 'GET',
            handler: () =>
                this.getPublishableKey(),
        });

        this.addRoute({
            path: PaymentApiPath.CREATE_SUBSCRIPTION,
            method: 'POST',
            handler: (options) =>
                this.createSubscription(options as ApiHandlerOptions<{
                    body: CreateSubscriptionRequestDto;
                }>),
        });

        this.addRoute({
            path: PaymentApiPath.PRICES,
            method: 'GET',
            handler: () =>
                this.getPrices(),
        });
    }

        /**
     * @swagger
     * /payment/create-subscription:
     *    post:
     *      description: Create subscription
     *      requestBody:
     *        description: Subscription data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                name:
     *                  type: number
     *                email:
     *                  type: string
     *                  format: email
     *                paymentMethod:
     *                  type: string
     *                priceId:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  clientSecret:
     *                    type: string
     *                  subscriptionId:
     *                    type: string
     */
    private async createSubscription(
        options: ApiHandlerOptions<{
            body: CreateSubscriptionRequestDto;
    }>): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.paymentService.createSubscription(options.body),
        };
    }

    /**
     * @swagger
     * /payment/config:
     *    get:
     *      description: Returns publishable key 
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  publishableKey:
     *                    type: string
     */
    private getPublishableKey(): ApiHandlerResponse {
        return {
            status: HttpCode.OK,
            payload: this.paymentService.getPublishableKey(),
        };
    }

        /**
     * @swagger
     * /payment/config:
     *    get:
     *      description: Returns prices 
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  publishableKey:
     *                    type: string
     */
    private async getPrices(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.paymentService.getPrices(),
        };
    }
}

export { PaymentController };
