const UsersApiPath = {
    ROOT: '/',
    ID: '/:id',
    ID_PDF_DOWNLOADS: (id = ':id'): string => `/${id}/pdf-downloads`,
} as const;

export { UsersApiPath };
