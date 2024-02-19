import  { type ValueOf } from 'shared/src/types/value-of.type';

import { type HttpCode, HttpError } from '~/common/http/http.js';

type Constructor = {
  message: string;
  status: ValueOf<typeof HttpCode>;
  cause?: unknown;
};

class FileError extends HttpError {
  public constructor({ message, cause, status }: Constructor) {
    super({ message, status, cause });
  }
}

export { FileError };