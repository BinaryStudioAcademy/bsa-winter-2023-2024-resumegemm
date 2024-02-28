import {
    accessResume,
    createResumeAccess,
    deleteAccessResume,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
    deleteAccessResume,
    createResumeAccess,
};

export { reducer } from './slice';
export { allActions as actions };
