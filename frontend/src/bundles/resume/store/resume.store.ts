import {
    createResume,
    deleteResume,
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    setTemplateSettingsOnResumeCreate,
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
    setTemplateSettingsOnResumeCreate,
    createResume,
    deleteResume,
};

export { allActions as actions };
export { reducer } from './slice.js';
