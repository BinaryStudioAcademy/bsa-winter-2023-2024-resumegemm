import { getAllResumes } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumes,
};

export { allActions as actions };
export { reducer } from './slice.js';
