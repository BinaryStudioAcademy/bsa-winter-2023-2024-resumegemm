import { getAllResumesByUserId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumesByUserId,
};

export { reducer } from './slice.js';
export { allActions as actions };
