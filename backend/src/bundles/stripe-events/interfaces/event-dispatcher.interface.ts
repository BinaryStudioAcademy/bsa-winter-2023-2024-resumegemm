import { type Stripe } from 'stripe';

import { type IEventHandler } from './event-handler.interface';

interface IEventDispatcher {
    dispatch(
        eventType: Stripe.Event.Type,
        eventData: Stripe.Event.Data,
    ): Promise<void>;
    registerHandler(
        eventType: Stripe.Event.Type,
        handler: IEventHandler<Stripe.Event.Data>,
    ): void;
}

export { type IEventDispatcher };
