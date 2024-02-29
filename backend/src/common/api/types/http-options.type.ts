import { type RawAxiosRequestHeaders } from 'axios';
import { type HttpMethod } from 'shared/build/index.js';

type HttpOptions<T> = {
    method?: HttpMethod;
    data?: T;
    token?: string;
    headers?: RawAxiosRequestHeaders;
};

export { type HttpOptions };
