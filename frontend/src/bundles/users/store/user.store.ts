import { deleteProfile, incrementPDFDownloads, loadAll } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    deleteProfile,
    incrementPDFDownloads,
};

export { reducer } from './slice.js';
export { allActions as actions };
