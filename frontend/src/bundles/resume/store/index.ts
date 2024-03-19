import { downloadPDFDocument } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    downloadPDFDocument,
};

export { reducer } from './slice.js';
export { allActions as actions };
