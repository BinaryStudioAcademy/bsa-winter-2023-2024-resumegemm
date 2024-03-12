import { getAllResumes, getCurrentResumeWithTemplate } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumes,
    getCurrentResumeWithTemplate,
};

export { allActions as actions };
export { reducer } from './slice.js';
