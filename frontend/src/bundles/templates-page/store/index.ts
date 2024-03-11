import { loadAllTemplates } from './actions';
import { actions } from './slice';

const allActions = {
    loadAllTemplates,
    ...actions,
};

export { allActions as actions };
export { reducer } from './slice';
