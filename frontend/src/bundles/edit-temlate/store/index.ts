import { editTemplate } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    editTemplate,
};

export { allActions as actions };
export { reducer } from './slice';
