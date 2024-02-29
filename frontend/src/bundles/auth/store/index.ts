import {
    forgotPassword,
    resetPassword,
    signUp,
    verifyResetToken,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    forgotPassword,
    verifyResetToken,
    resetPassword,
};

export { allActions as actions };
export { reducer } from './slice.js';
