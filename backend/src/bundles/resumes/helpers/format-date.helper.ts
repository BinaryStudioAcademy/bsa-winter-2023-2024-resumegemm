const formatDate = (date: string): string => {
    const unpatedAtDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(unpatedAtDate);
};

export { formatDate };
