import {
    createResume,
    deleteResume,
    downloadPDFDocument,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    getViewsCountByUserId,
    setTemplateSettingsOnResumeCreate,
    updateCurrentResume,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getAllResumes,
    getCurrentResumeWithTemplate,
    getResumeReviewFromAI,
    getViewsCountByUserId,
    downloadPDFDocument,
    updateCurrentResume,
    setTemplateSettingsOnResumeCreate,
    createResume,
    deleteResume,
};

export { allActions as actions };
export { reducer } from './slice.js';
