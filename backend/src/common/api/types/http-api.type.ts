import { type HttpOptions } from './http-options.type.js';

type HttpApi = {
    load<T, K>(url: string, options?: HttpOptions<T>): Promise<K>;
};

export { type HttpApi };
