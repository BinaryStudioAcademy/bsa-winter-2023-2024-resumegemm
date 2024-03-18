import { getViewsCountByUserId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getViewsCountByUserId,
};

export { reducer } from './slice.js';
export { allActions as actions };
