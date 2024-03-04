type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
    user?: unknown;
    headers?: unknown;
    cookies?: unknown;
    unsignCookie?: unknown;
    fileBuffer?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    user: T['user'];
    headers: T['headers'];
    cookies: T['cookies'];
    unsignCookie: T['unsignCookie'];
    fileBuffer: T['fileBuffer'];
};

export { type ApiHandlerOptions };
