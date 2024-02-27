import {
    type CreateSubscriptionRequestDto,
    type CreateSubscriptionResponseDto,
    type GetPricesResponseDto,
    type GetPublishableKeyResponseDto,
} from './types.js';

type IPaymentService = {
    getPublishableKey(): GetPublishableKeyResponseDto;

    getPrices(): Promise<GetPricesResponseDto>;

    createSubscription(
        data: CreateSubscriptionRequestDto,
    ): Promise<CreateSubscriptionResponseDto>;
};

export { type IPaymentService };
