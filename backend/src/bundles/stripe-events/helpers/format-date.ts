const MILLIS_TO_SECOND = 1000;

const formatDate = (timeStamp: number): string => {
    const date = new Date(timeStamp * MILLIS_TO_SECOND);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export { formatDate };
