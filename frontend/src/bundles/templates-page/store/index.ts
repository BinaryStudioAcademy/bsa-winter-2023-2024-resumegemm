import { deleteTemplate, loadAllTemplates } from './actions';
import { actions } from './slice';

const allActions = {
    deleteTemplate,
    loadAllTemplates,
    ...actions,
};

export { reducer } from './slice';
export { allActions as actions };
