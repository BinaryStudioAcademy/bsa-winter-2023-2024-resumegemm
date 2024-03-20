import {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
    getUserResumesWithLinks,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
    deleteAccessResume,
    createResumeAccess,
    accessResumeDetails,
    getUserResumesWithLinks,
};

export { reducer } from './slice';
export { allActions as actions };
