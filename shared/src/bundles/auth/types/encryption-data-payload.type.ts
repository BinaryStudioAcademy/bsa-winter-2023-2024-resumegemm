type EncryptionDataPayload = {
    plaintTextPassword: string;
    passwordSalt: string | null;
    passwordHash: string | null;
};

export { type EncryptionDataPayload };
