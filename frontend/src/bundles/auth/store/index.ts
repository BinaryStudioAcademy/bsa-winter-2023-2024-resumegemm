import {
    forgotPassword,
    getUser,
    resetPassword,
    signIn,
    signUp,
    verifyResetPasswordToken,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    getUser,
    forgotPassword,
    verifyResetPasswordToken,
    resetPassword,
};

export { allActions as actions };
export { reducer } from './slice.js';
