const formatDate = (date: string): string => {
    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
        return date;
    }

    return formattedDate.toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

export { formatDate };
