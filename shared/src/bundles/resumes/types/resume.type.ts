type Resume = {
    id: string;
    title: string;
    resumeTitle?: string;
    image: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt: string | null;
    userId: string;
    templateId: string;
};

export { type Resume };
