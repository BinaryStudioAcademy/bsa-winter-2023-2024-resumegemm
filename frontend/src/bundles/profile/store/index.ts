import { updateUserAvatar } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    updateUserAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
