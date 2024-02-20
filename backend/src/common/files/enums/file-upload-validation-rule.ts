const FileUploadValidationRule = {
    MAXIMUM_FILE_SIZE: 10_000_000,
    UPLOAD_FILE_CONTENT_TYPES: ['png', 'jpg', 'jpeg'],
} as const;

export { FileUploadValidationRule };
