import { loadAll, loadUser } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    loadUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
