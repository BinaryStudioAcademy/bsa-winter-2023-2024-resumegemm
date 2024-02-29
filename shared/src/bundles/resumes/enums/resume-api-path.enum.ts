const ResumeApiPath = {
    ID_SHARE: (id = ':id'): string => `/${id}/share`,
    SHARE_ID: (id = ':id'): string => `/share/${id}`,
    SHARE_ID_DETAILS: (id = ':id'): string => `/share/${id}/details`,
    SCORE: '/score',
};

export { ResumeApiPath };
