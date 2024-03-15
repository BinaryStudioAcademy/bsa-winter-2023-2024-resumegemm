const ResumesApiPath = {
    ROOT: '/',
    ID: '/:id',
    USER_ID: '/user/:userId',
    SCORE: '/score',
    ID_SHARE: (id = ':id'): string => `/${id}/share`,
    SHARE_ID: (id = ':id'): string => `/share/${id}`,
    SHARE_ID_DETAILS: (id = ':id'): string => `/share/${id}/details`,
    SHARE_RESUME_ID: (id = ':id'): string => `/share/resume/${id}`,
    USER_ID_VIEWS: (userId = ':userId'): string => `/user/${userId}/views`,
} as const;

export { ResumesApiPath };
