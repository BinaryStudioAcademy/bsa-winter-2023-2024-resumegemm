import { type ServerErrorType, ExceptionMessage } from '~/enums/enums.js';
import { HttpCode } from '~/framework/http/http.js';
import { type ValueOf } from '~/types/value-of.type.js';

import { ApplicationError } from '../application-error/application-error.exception.js';

type Constructor = {
    message?: string;
    status?: ValueOf<typeof HttpCode>;
    errorType?: ServerErrorType;
};

class AuthError extends ApplicationError {
    public status: ValueOf<typeof HttpCode>;
    public errorType?: ServerErrorType;

    public constructor({
        message = ExceptionMessage.AUTH_FAILED,
        status = HttpCode.UNAUTHORIZED,
        errorType,
    }: Constructor = {}) {
        super({
            message,
        });
        this.status = status;
        this.errorType = errorType;
    }
}

export { AuthError };
