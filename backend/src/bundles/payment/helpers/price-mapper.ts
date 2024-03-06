import { type Stripe } from 'stripe';

import { type GetPriceResponseDto } from '../types/types';

const mapPrices = (
    price: Stripe.Price & { product: Stripe.Product },
): GetPriceResponseDto => {
    return {
        id: price.id,
        unit_amount: price.unit_amount,
        recurring: {
            interval: price.recurring?.interval,
            interval_count: price.recurring?.interval_count,
        },
        currency: price.currency,
        product: {
            images: price.product.images,
            name: price.product.name,
            description: price.product.description,
        },
    };
};

export { mapPrices };
