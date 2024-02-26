type TPDFService = {
    generatePDF: (html: string) => Promise<Buffer>;
};

export { type TPDFService };
