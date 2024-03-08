const setCookie = (cookieName: string, cookieValue: string): void => {
    document.cookie = `${cookieName}=${cookieValue}`;
};

export { setCookie };
