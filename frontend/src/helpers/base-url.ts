const baseUrl = (): string => {
    const url = window.location.protocol + '//' + window.location.hostname;

    if (window.location.port) {
        return url + ':' + window.location.port;
    }

    return url;
};

export { baseUrl };
