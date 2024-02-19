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
import { type CreatePaymentIntentRequestDto } from './types/types.js';

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
}

export { PaymentController };
