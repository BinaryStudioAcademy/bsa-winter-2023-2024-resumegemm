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
import {
    type CreateSubscriptionRequestDto,
    type CreateSubscriptionResponseDto,
    type GetPricesResponseDto,
    type GetPublishableKeyResponseDto,
} from './types/types.js';
import { paymentCreateSubscriptionValidationSchema } from './validation-schemas/validation-schemas.js';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      GetPriceResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          currency:
 *            type: string
 *          interval:
 *            type: string
 *            nullable: true
 *          unit_amount:
 *            type: number
 *            nullable: true
 *          product:
 *            type: object
 *            properties:
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *              name:
 *                type: string
 *              description:
 *                type: string
 *                nullable: true
 */
class PaymentController extends Controller {
    private paymentService: PaymentService;

    public constructor(logger: ILogger, paymentService: PaymentService) {
        super(logger, ApiPath.PAYMENT);

        this.paymentService = paymentService;

        this.addRoute({
            path: PaymentApiPath.CONFIG,
            method: 'GET',
            handler: () => this.getPublishableKey(),
        });

        this.addRoute({
            path: PaymentApiPath.CREATE_SUBSCRIPTION,
            method: 'POST',
            validation: {
                body: paymentCreateSubscriptionValidationSchema,
            },
            handler: (options) =>
                this.createSubscription(
                    options as ApiHandlerOptions<{
                        body: CreateSubscriptionRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: PaymentApiPath.PRICES,
            method: 'GET',
            handler: () => this.getPrices(),
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
     *                  type: string
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
        }>,
    ): Promise<ApiHandlerResponse<CreateSubscriptionResponseDto>> {
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
    private getPublishableKey(): ApiHandlerResponse<GetPublishableKeyResponseDto> {
        return {
            status: HttpCode.OK,
            payload: this.paymentService.getPublishableKey(),
        };
    }

    /**
     * @swagger
     * /payment:
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
     *                  prices:
     *                    type: array
     *                    items:
     *                      $ref: '#/components/schemas/GetPriceResponseDto'
     */
    private async getPrices(): Promise<
        ApiHandlerResponse<GetPricesResponseDto>
    > {
        return {
            status: HttpCode.OK,
            payload: await this.paymentService.getPrices(),
        };
    }
}

export { PaymentController };
