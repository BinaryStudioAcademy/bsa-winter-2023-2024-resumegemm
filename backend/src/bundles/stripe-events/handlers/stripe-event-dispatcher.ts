import { type Stripe } from 'stripe';

import {
    type IEventDispatcher,
    type IEventHandler,
} from '../interfaces/interfaces';

class StripeEventDispatcher implements IEventDispatcher {
    private eventHandlers: Map<
        Stripe.Event.Type,
        IEventHandler<Stripe.Event.Data>
    >;

    public constructor() {
        this.eventHandlers = new Map();
    }

    public registerHandler(
        eventType: Stripe.Event.Type,
        handler: IEventHandler<Stripe.Event.Data>,
    ): void {
        this.eventHandlers.set(eventType, handler);
    }

    public async dispatch(
        eventType: Stripe.Event.Type,
        eventData: Stripe.Event.Data,
    ): Promise<void> {
        const handler = this.eventHandlers.get(eventType);
        if (handler) {
            await handler.handle(eventData);
        }
    }
}

export { StripeEventDispatcher };
