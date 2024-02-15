interface Data {
    date: string;
}

const formatDate = (date: Data): string => {
    const formattedDate = new Date(date.date);

    if (Number.isNaN(formattedDate.getTime())) {
        return date.date;
    }

    return formattedDate.toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

export { formatDate };
