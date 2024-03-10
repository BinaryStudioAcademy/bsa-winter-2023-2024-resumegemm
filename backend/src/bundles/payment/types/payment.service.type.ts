import {
    type CreateSubscriptionRequestDto,
    type CreateSubscriptionResponseDto,
    type GetPricesResponseDto,
    type GetPublishableKeyResponseDto,
} from './types.js';

interface IPaymentService {
    getPublishableKey(): GetPublishableKeyResponseDto;

    getPrices(): Promise<GetPricesResponseDto>;

    createSubscription(
        data: CreateSubscriptionRequestDto,
    ): Promise<CreateSubscriptionResponseDto>;
}

export { type IPaymentService };
