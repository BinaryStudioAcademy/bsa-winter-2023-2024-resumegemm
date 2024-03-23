import { getRecentlyViewedResumes } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getRecentlyViewedResumes,
};

export { allActions as actions };
export { reducer } from './slice.js';
