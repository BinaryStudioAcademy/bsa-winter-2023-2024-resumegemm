import { deleteProfile, loadAll } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    deleteProfile,
};

export { reducer } from './slice.js';
export { allActions as actions };
