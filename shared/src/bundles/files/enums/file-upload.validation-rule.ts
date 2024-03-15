const FileUploadValidationRule = {
    MAXIMUM_FILE_SIZE: 10_000_000,
    UPLOAD_FILE_CONTENT_TYPES: [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/svg+xml',
    ],
} as const;

export { FileUploadValidationRule };
