import { createPaymentIntent, createSubscription, getPublishableKey } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getPublishableKey,
    createPaymentIntent,
    createSubscription
};

export { allActions as actions };
export { reducer } from './slice.js';
