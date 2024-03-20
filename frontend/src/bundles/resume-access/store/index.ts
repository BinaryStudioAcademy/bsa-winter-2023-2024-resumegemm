import {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
    getResumeAccessByResumeId,
    getUserResumesWithLinks,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
    deleteAccessResume,
    createResumeAccess,
    accessResumeDetails,
    getResumeAccessByResumeId,
    getUserResumesWithLinks,
};

export { reducer } from './slice';
export { allActions as actions };
