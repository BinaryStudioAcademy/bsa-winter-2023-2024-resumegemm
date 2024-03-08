const getCookie = (cookieName: string): string => {
    const getAllCookies = document.cookie.split('; ');
    const findCookieAndGetValue = getAllCookies
        .find((row) => row.startsWith(`${cookieName}=`))
        ?.split('=')[1];
    return findCookieAndGetValue as string;
};

export { getCookie };
