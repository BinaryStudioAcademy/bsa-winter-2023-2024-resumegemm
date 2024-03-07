import { getUser, signIn, signUp, updateAccessToken } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    getUser,
    updateAccessToken,
};

export { allActions as actions };
export { reducer } from './slice.js';
