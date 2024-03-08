import { createTemplate, getTemplateById } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTemplate,
    getTemplateById,
};

export { allActions as actions };
export { reducer } from './slice';
