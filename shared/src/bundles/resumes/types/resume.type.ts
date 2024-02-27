type Resume = {
    id: string;
    resumeTitle: string;
    image: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt: string | null;
    userId: string;
    templateId: string;
};

export { type Resume };
