import { confirmEmail, getUser, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    confirmEmail,
    signUp,
    signIn,
    getUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
