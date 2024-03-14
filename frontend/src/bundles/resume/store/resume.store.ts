import {
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    updateCurrentResume,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    downloadPDFDocument,
    updateCurrentResume,
};

export { allActions as actions };
export { reducer } from './slice.js';
