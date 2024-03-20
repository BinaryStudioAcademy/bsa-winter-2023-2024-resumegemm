type Resume = {
    id: string;
    title: string;
    image: string;
    resumeTitle?: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt: string | null;
    userId: string;
    templateId: string;
};

export { type Resume };
