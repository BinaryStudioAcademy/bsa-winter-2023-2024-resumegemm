import { getAll } from './actions.js';
import { actions } from './slice';

const allActions = {
    ...actions,
    getAll,
};

export { allActions as actions };
export { reducer } from './slice';
