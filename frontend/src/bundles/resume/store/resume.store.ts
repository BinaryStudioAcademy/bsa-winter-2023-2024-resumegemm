import {
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
};

export { allActions as actions };
export { reducer } from './slice.js';
