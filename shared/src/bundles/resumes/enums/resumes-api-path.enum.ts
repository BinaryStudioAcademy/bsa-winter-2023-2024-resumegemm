const ResumesApiPath = {
    ROOT: '/',
    ID: '/:id',
    USER_ID: '/user',
    SCORE: '/score',
    ID_SHARE: (id = ':id'): string => `/${id}/share`,
    SHARE_ID: (id = ':id'): string => `/share/${id}`,
    SHARE_ID_DETAILS: (id = ':id'): string => `/share/${id}/details`,
    SHARE: '/share',
} as const;

export { ResumesApiPath };
