import { deleteUserAvatar, updateUserAvatar } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    deleteUserAvatar,
    updateUserAvatar,
};

export { allActions as actions };
export { reducer } from './slice.js';
