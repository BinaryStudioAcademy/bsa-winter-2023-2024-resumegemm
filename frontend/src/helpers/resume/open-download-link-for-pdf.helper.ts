const openDownloadLinkForPDF = (blob: Blob): void => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';
    document.body.append(link);
    link.click();
};

export { openDownloadLinkForPDF };
