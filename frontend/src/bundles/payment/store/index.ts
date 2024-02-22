import { createPaymentIntent, createSubscription, getPrices, getPublishableKey } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getPublishableKey,
    createPaymentIntent,
    createSubscription,
    getPrices
};

export { allActions as actions };
export { reducer } from './slice.js';
