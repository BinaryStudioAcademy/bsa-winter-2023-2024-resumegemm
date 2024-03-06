import { deleteProfile, loadAll, loadUser } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    loadUser,
    deleteProfile,
};

export { reducer } from './slice.js';
export { allActions as actions };
