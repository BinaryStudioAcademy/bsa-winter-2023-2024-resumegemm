import { type Stripe } from 'stripe';

const getCardExpireDate = (card: Stripe.PaymentMethod.Card): Date => {
    const { exp_month, exp_year } = card;
    return new Date(exp_year, exp_month - 1);
};

export { getCardExpireDate };
