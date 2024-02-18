type RecentlyViewedResponseDto = {
    id: string;
    userId: string;
    resumeId: string | null;
    templateId: string | null;
    viewedAt: string;
};

export { type RecentlyViewedResponseDto };
