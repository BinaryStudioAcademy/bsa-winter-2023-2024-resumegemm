import { createSubscription, getPrices, getPublishableKey } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getPublishableKey,
    createSubscription,
    getPrices
};

export { allActions as actions };
export { reducer } from './slice.js';
