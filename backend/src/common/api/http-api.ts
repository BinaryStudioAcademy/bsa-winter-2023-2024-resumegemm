import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import {
    type HttpCode,
    type ValueOf,
    HttpError,
    HttpHeader,
} from 'shared/build/index.js';

import { type HttpApi, type HttpOptions } from '~/common/api/types/types.js';

class Http implements HttpApi {
    private axiosInstance: AxiosInstance;

    public constructor() {
        this.axiosInstance = axios.create({
            timeout: 5000,
        });
    }

    public load<T, K>(
        url: string,
        options?: HttpOptions<T>,
    ): Promise<K> | never {
        const { data, headers = {}, method = 'GET', token } = options ?? {};

        if (token) {
            headers[HttpHeader.AUTHORIZATION] = `Bearer ${token}`;
        }

        return this.axiosInstance
            .request<T, K>({
                url,
                method,
                headers,
                data,
            })
            .then(this.getData)
            .catch(this.catchAndHandleError);
    }

    private getData = <T>(response: T): AxiosResponse<T>['data'] => {
        return (response as AxiosResponse<T>).data;
    };
    private catchAndHandleError = <T>(error: {
        response: { data: AxiosResponse<T>; status: ValueOf<typeof HttpCode> };
    }): never => {
        const {
            response: { data, status },
        } = error;
        throw new HttpError({
            message: JSON.stringify(data),
            status,
        });
    };
}

export { Http };
