import { accessResume } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    accessResume,
};

export { allActions as actions };
export { reducer } from './slice';
