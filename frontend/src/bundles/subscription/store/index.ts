import { cancelSubscription, getById, keepSubscription } from './actions.js';
import { actions } from './slice';

const allActions = {
    ...actions,
    cancelSubscription,
    getById,
    keepSubscription,
};

export { allActions as actions };
export { reducer } from './slice';
