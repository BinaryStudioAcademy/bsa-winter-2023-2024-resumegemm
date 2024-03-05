import { type UserVerifyResetPasswordTokenRequestDto } from 'shared/build/index.js';

const DEFAULT_RESET_PASSWORD_TOKEN_PAYLOAD: Omit<
    UserVerifyResetPasswordTokenRequestDto,
    'email'
> = {
    resetPasswordToken: '',
} as const;

export { DEFAULT_RESET_PASSWORD_TOKEN_PAYLOAD };
