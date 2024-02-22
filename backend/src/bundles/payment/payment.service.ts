import Stripe from 'stripe';

import { type IConfig } from '~/common/config/config';

import { 
  type CreateSubscriptionRequestDto,
  type CreateSubscriptionResponseDto,
  type GetPriceResponseDto,
  type GetPricesResponseDto, 
  type GetPublishableKeyResponseDto 
} from './types/types';

class PaymentService {
    private appConfig: IConfig;
    private stripe: Stripe;

    public constructor(config: IConfig) {
        this.appConfig = config;
        this.stripe = new Stripe(this.appConfig.ENV.STRIPE.STRIPE_SECRET_KEY);
    }

    public getPublishableKey(): GetPublishableKeyResponseDto {
        return { publishableKey: this.appConfig.ENV.STRIPE.STRIPE_PUBLISHABLE_KEY };
    }

    public async getPrices(): Promise<GetPricesResponseDto> {
        const { data } = (await this.stripe.prices.list({
            expand: ['data.product']
        }));

        return {
            prices: data as GetPriceResponseDto[]
        };
    }

    public async createSubscription({ name, email, paymentMethod, priceId }: CreateSubscriptionRequestDto): Promise<CreateSubscriptionResponseDto> {

        const customer = await this.stripe.customers.create({
          name: name,
          email: email,
          payment_method: paymentMethod,
          invoice_settings: {
            default_payment_method: paymentMethod,
          },
        });
    
        const subscription = await this.stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }],
          payment_settings: {
            payment_method_options: {
              card: {
                request_three_d_secure: 'any',
              },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          expand: ['latest_invoice.payment_intent'],
        });

        const { latest_invoice, id } = subscription;

        if (!latest_invoice || typeof latest_invoice === 'string') {
            return {
                clientSecret: null,
                subscriptionId: id,
              };
        }

        const { client_secret } = latest_invoice.payment_intent as Stripe.PaymentIntent;

        return {
          clientSecret: client_secret,
          subscriptionId: id,
        };
      }
}

export { PaymentService };
