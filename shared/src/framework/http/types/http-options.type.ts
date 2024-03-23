import { type HttpMethod } from './http-method.type.js';

type HttpOptions = {
    method: HttpMethod;
    payload: BodyInit | null;
    headers: Headers;
    withCredentials?: boolean;
    query?: Record<string, string>;
};

export { type HttpOptions };
