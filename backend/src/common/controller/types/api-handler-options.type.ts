type DefaultApiHandlerOptions = {
    body?: unknown;
    rawBody?: unknown;
    query?: unknown;
    params?: unknown;
    user?: unknown;
    headers?: unknown;
    cookies?: unknown;
    unsignCookie?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    rawBody: T['rawBody'];
    query: T['query'];
    params: T['params'];
    user: T['user'];
    headers: T['headers'];
    cookies: T['cookies'];
    unsignCookie: T['unsignCookie'];
};

export { type ApiHandlerOptions };
