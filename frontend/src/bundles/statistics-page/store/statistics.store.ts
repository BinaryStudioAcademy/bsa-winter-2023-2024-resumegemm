import { getStatistics } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getStatistics,
};

export { reducer } from './slice';
export { allActions as actions };
