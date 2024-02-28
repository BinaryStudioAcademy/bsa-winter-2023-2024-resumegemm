import {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
    deleteAccessResume,
    createResumeAccess,
    accessResumeDetails,
};

export { reducer } from './slice';
export { allActions as actions };
