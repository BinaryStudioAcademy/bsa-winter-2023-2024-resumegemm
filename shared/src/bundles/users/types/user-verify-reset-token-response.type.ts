import { type HttpCode } from '~/framework/http/http';

type UserVerifyResetPasswordTokenResponse = {
    status: typeof HttpCode.BAD_REQUEST | typeof HttpCode.OK;
    message: string;
};

export { type UserVerifyResetPasswordTokenResponse };
