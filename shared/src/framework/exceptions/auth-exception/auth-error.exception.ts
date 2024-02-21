import { ExceptionMessage } from '~/enums/enums.js';
import { HttpCode } from '~/framework/http/http.js';
import { type ValueOf } from '~/types/value-of.type.js';

import { ApplicationError } from '../application-error/application-error.exception.js';

type Constructor = {
    message?: string;
    status?: ValueOf<typeof HttpCode>;
};

class AuthError extends ApplicationError {
    public status: ValueOf<typeof HttpCode>;

    public constructor({ message = ExceptionMessage.AUTH_FAILED, status = HttpCode.UNAUTHORIZED }: Constructor = {}) {
        super({
            message,
        });
        this.status = status;
    }
}

export { AuthError };
