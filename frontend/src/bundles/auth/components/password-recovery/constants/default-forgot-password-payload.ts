import { type UserForgotPasswordRequestDto } from 'shared/build/index.js';

const DEFAULT_FORGOT_PASSWORD_PAYLOAD: UserForgotPasswordRequestDto = {
    email: '',
} as const;

export { DEFAULT_FORGOT_PASSWORD_PAYLOAD };
