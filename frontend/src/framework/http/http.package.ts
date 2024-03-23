import { type IHttp } from './interfaces/interfaces.js';
import { type HttpOptions } from './types/types.js';

class HTTP implements IHttp {
    public load(path: string, options: HttpOptions): Promise<Response> {
        const { method, payload, headers, withCredentials, query } = options;
        const url = this.getUrl(path, query);

        return fetch(url, {
            method,
            headers,
            body: payload,
            credentials: withCredentials ? 'include' : 'same-origin',
        });
    }

    private getUrl = (url: string, query?: Record<string, string>): string => {
        if (query) {
            return `${url}?${this.getStringifiedQuery(query)}`;
        }

        return url;
    };

    private getStringifiedQuery(query: Record<string, string>): string {
        return Object.keys(query)
            .filter((key) => query[key])
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        query[key],
                    )}`,
            )
            .join('&');
    }
}

export { HTTP };
