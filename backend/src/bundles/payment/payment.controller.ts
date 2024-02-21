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
import { type CreatePaymentIntentRequestDto, type CreateSubscriptionRequestDto } from './types/types.js';

class PaymentController extends Controller {
    private paymentService: PaymentService;

    public constructor(logger: ILogger, paymentService: PaymentService) {
        super(logger, ApiPath.PAYMENT);

        this.paymentService = paymentService;

        this.addRoute({
            path: PaymentApiPath.PAYMENT_INTENT,
            method: 'POST',
            handler: (options) =>
                this.createPaymentIntent(options as ApiHandlerOptions<{
                    body: CreatePaymentIntentRequestDto;
                }>),
        });

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
    }

    /**
     * @swagger
     * /payment/create-payment-intent:
     *    post:
     *      description: Create payment intent
     *      requestBody:
     *        description: Create payment intent data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                amount:
     *                  type: number
     *                currency:
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
     */
    private async createPaymentIntent(
        options: ApiHandlerOptions<{
            body: CreatePaymentIntentRequestDto;
    }>): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.paymentService.createPaymentIntent(options.body),
        };
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
}

export { PaymentController };
