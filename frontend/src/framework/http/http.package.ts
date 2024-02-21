import { type IHttp } from './interfaces/interfaces.js';
import { type HttpOptions } from './types/types.js';

class Http implements IHttp {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { method, payload, headers, withCredentials } = options;

        return fetch(path, {
            method,
            headers,
            body: payload,
            credentials: withCredentials ? 'include' : 'same-origin',
        });
    }
}

export { Http };
