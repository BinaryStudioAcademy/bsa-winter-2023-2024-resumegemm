import { downloadPDFDocument, getAllResumesByUserId } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    downloadPDFDocument,
    getAllResumesByUserId,
};

export { reducer } from './slice.js';
export { allActions as actions };
