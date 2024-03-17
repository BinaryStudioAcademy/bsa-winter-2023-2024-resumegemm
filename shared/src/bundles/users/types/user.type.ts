type User = {
    id: string;
    email: string;
    profileId: string;
    createdAt: string;
    updatedAt: string;
    stripeId: string | null;
    pdfDownloads: number;
};

export { type User };
