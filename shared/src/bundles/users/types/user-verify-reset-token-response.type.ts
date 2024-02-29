import { type HttpCode } from '~/framework/http/http';

type UserVerifyResetTokenResponse = {
    status: typeof HttpCode.BAD_REQUEST | typeof HttpCode.OK;
    message: string;
};

export { type UserVerifyResetTokenResponse };
