import { ApiPath, ContentType } from '~/bundles/common/enums/enums.js';
import { HttpApi } from '~/framework/api/api.js';
import { type IHttp } from '~/framework/http/http.js';
import { type IStorage } from '~/framework/storage/storage.js';

import { PaymentApiPath } from './enums/enums.js';
import { type CreatePaymentIntentRequestDto, type CreatePaymentIntentResponseDto, type CreateSubscriptionRequestDto, type CreateSubscriptionResponseDto,type GetPublishableKeyResponseDto } from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class PaymentApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.PAYMENT, baseUrl, http, storage });
    }

    public async getPublishableKey(): Promise<GetPublishableKeyResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(PaymentApiPath.CONFIG, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: false,
            },
        );

        return await response.json<GetPublishableKeyResponseDto>();
    }

    public async createPaymentIntent(payload: CreatePaymentIntentRequestDto): Promise<CreatePaymentIntentResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(PaymentApiPath.PAYMENT_INTENT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: false,
            },
        );

        return await response.json<CreatePaymentIntentResponseDto>();
    }

    public async createSubscription(payload: CreateSubscriptionRequestDto): Promise<CreateSubscriptionResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(PaymentApiPath.CREATE_SUBSCRIPTION, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );

        return await response.json<CreateSubscriptionResponseDto>();
    }
}

export { PaymentApi };
