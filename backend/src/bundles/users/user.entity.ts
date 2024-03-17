import { type UserEntityFields } from 'shared/build/index.js';

import { type IEntity } from '~/common/interfaces/interfaces.js';

class UserEntity implements IEntity {
    private 'id': string | null;

    private 'email': string;

    private 'profileId': string;

    private 'passwordHash': string | null;

    private 'passwordSalt': string | null;

    private 'stripeId': string | null;

    private 'pdfDownloads': number;

    private constructor({
        id,
        email,
        profileId,
        passwordHash,
        passwordSalt,
        stripeId,
        pdfDownloads,
    }: UserEntityFields) {
        this.id = id;
        this.email = email;
        this.profileId = profileId;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.stripeId = stripeId;
        this.pdfDownloads = pdfDownloads;
    }

    public static initialize({
        id,
        email,
        profileId,
        passwordHash,
        passwordSalt,
        stripeId,
        pdfDownloads,
    }: UserEntityFields): UserEntity {
        return new UserEntity({
            id,
            email,
            profileId,
            passwordHash,
            passwordSalt,
            stripeId,
            pdfDownloads,
        });
    }

    public static initializeNew({
        email,
        profileId,
        passwordHash,
        passwordSalt,
        stripeId,
        pdfDownloads,
    }: Omit<UserEntityFields, 'id'>): UserEntity {
        return {
            email,
            profileId,
            passwordHash,
            passwordSalt,
            stripeId,
            pdfDownloads,
        } as unknown as UserEntity;
    }

    public toObject(): Pick<UserEntityFields, 'id' | 'email'> {
        return {
            id: this.id as string,
            email: this.email,
        };
    }

    public toNewObject(): UserEntityFields {
        return {
            id: this.id as NonNullable<string>,
            profileId: this.profileId,
            email: this.email,
            passwordHash: this.passwordHash,
            passwordSalt: this.passwordSalt,
            stripeId: this.stripeId,
            pdfDownloads: this.pdfDownloads,
        };
    }
}

export { UserEntity };
