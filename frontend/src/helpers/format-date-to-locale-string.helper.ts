const formatDateToLocaleString = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
};

export { formatDateToLocaleString };
