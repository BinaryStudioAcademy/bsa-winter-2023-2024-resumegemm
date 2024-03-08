import { getCookie } from 'shared/build';

import { ContentType, ServerErrorType } from '~/bundles/common/enums/enums.js';
import {
    type ServerErrorResponse,
    type ValueOf,
} from '~/bundles/common/types/types.js';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum.js';
import { showToast } from '~/bundles/toast/helpers/show-toast.js';
import {
    type HttpCode,
    type IHttp,
    HTTPError,
    HttpHeader,
} from '~/framework/http/http.js';
import { type IStorage, StorageKey } from '~/framework/storage/storage.js';
import { configureString } from '~/helpers/helpers.js';

import { type IHttpApi } from './interfaces/interfaces.js';
import { type HttpApiOptions, type HttpApiResponse } from './types/types.js';

type Constructor = {
    baseUrl: string;
    path: string;
    http: IHttp;
    storage: IStorage;
};

class HTTPApi implements IHttpApi {
    private baseUrl: string;

    private path: string;

    private http: IHttp;

    private storage: IStorage;

    public constructor({ baseUrl, path, http, storage }: Constructor) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.http = http;
        this.storage = storage;
    }

    public async load(
        path: string,
        options: HttpApiOptions,
    ): Promise<HttpApiResponse> {
        const {
            method,
            contentType,
            payload = null,
            hasAuth,
            withCredentials = false,
        } = options;

        const headers = await this.getHeaders(contentType, hasAuth);

        const response = await this.http.load(path, {
            method,
            headers,
            payload,
            withCredentials,
        });

        return (await this.checkResponse(response)) as HttpApiResponse;
    }

    protected getFullEndpoint<T extends Record<string, string>>(
        ...parameters: [...string[], T]
    ): string {
        const copiedParameters = [...parameters];

        const options = copiedParameters.pop() as T;

        return configureString(
            this.baseUrl,
            this.path,
            ...(copiedParameters as string[]),
            options,
        );
    }

    private async getHeaders(
        contentType: ValueOf<typeof ContentType>,
        hasAuth: boolean,
    ): Promise<Headers> {
        const headers = new Headers();

        if (contentType !== ContentType.FORM_DATA) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        if (hasAuth) {
            const tokenFromLocalStorage = await this.storage.get<string>(
                StorageKey.ACCESS_TOKEN,
            );

            const tokenFromCookie = getCookie(StorageKey.ACCESS_TOKEN);

            const token = tokenFromLocalStorage ?? tokenFromCookie;

            headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
        }

        return headers;
    }

    private async checkResponse(response: Response): Promise<Response | never> {
        if (!response.ok) {
            await this.handleError(response);
        }

        return response;
    }

    private async handleError(response: Response): Promise<never> {
        const parsedException = (await response.json().catch(
            (): ServerErrorResponse => ({
                errorType: ServerErrorType.COMMON,
                message: response.statusText,
            }),
        )) as ServerErrorResponse;

        const isCustomException = Boolean(parsedException.errorType);
        if (response.status >= 400 && response.status < 600) {
            showToast(parsedException.message, ToastType.ERROR, {
                theme: 'dark',
            });
        }

        throw new HTTPError({
            status: response.status as ValueOf<typeof HttpCode>,
            errorType: isCustomException
                ? parsedException.errorType
                : ServerErrorType.COMMON,
            message: parsedException.message,
            details:
                'details' in parsedException ? parsedException.details : [],
        });
    }
}

export { HTTPApi as HttpApi };
