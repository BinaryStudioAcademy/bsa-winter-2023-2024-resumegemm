import { getById } from './actions.js';
import { actions } from './slice';

const allActions = {
    ...actions,
    getById,
};

export { allActions as actions };
export { reducer } from './slice';
