import {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
    getResumeAccessByResumeId,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
    deleteAccessResume,
    createResumeAccess,
    accessResumeDetails,
    getResumeAccessByResumeId,
};

export { reducer } from './slice';
export { allActions as actions };
