import {
    confirmEmail,
    getUser,
    requestNewAccessToken,
    signIn,
    signUp,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    confirmEmail,
    signUp,
    signIn,
    getUser,
    requestNewAccessToken,
};

export { allActions as actions };
export { reducer } from './slice.js';
