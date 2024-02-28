const baseUrl = (): string =>
    window.location.protocol +
    '//' +
    window.location.hostname +
    (window.location.port ? ':' + window.location.port : '');

export { baseUrl };
