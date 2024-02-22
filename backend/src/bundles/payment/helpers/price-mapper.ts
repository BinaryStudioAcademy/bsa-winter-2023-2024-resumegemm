import { type Stripe } from 'stripe';

import { type GetPriceResponseDto } from '../types/types';

const priceMapper = (price: Stripe.Price & { product: Stripe.Product }): GetPriceResponseDto => {
    return {
        id: price.id,
        unit_amount: price.unit_amount,
        interval: price.recurring?.interval,
        currency: price.currency,
        product: {
            images: price.product.images,
            name: price.product.name,
            description: price.product.description
        }
    };
};

export { priceMapper };
