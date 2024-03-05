import { getRecentlyViewedTemplates } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getRecentlyViewedTemplates,
};

export { allActions as actions };
export { reducer } from './slice.js';
