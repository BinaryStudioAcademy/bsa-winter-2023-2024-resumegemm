import {
    downloadPDFDocument,
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
    downloadPDFDocument,
};

export { allActions as actions };
export { reducer } from './slice.js';
