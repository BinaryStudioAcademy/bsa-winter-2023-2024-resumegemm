import { getPublishableKey } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getPublishableKey,
};

export { allActions as actions };
export { reducer } from './slice.js';
