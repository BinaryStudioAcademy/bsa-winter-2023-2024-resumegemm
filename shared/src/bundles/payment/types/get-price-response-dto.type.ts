import { type Stripe } from 'stripe';

type GetPriceResponseDto = Stripe.Price & {
    product: Stripe.Product
};

export { type GetPriceResponseDto };
