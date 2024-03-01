import { getOauthUser, getUser, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    getUser,
    getOauthUser,
    signIn,
};

export { allActions as actions };
export { reducer } from './slice.js';
