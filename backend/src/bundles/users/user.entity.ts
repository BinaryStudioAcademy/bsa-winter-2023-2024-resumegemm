import { Guid as guid } from 'guid-typescript';
import { type UserEntityFields } from 'shared/build/index.js';

import { type IEntity } from '~/common/interfaces/interfaces.js';

class UserEntity implements IEntity {
    private 'id': string | null;

    private 'email': string;

    private 'profileId': string;

    private 'passwordHash': string;

    private 'passwordSalt': string;

    private 'emailConfirmed': boolean;

    private constructor({
        id,
        email,
        profileId,
        passwordHash,
        passwordSalt,
        emailConfirmed,
    }: UserEntityFields) {
        this.id = id;
        this.email = email;
        this.profileId = profileId;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.emailConfirmed = emailConfirmed;
    }

    public static initialize({
        id,
        email,
        profileId,
        passwordHash,
        passwordSalt,
        emailConfirmed,
    }: UserEntityFields): UserEntity {
        return new UserEntity({
            id,
            email,
            profileId,
            passwordHash,
            passwordSalt,
            emailConfirmed,
        });
    }

    public static initializeNew({
        email,
        profileId,
        passwordHash,
        passwordSalt,
        emailConfirmed,
    }: Omit<UserEntityFields, 'id'>): UserEntity {
        return new UserEntity({
            id: guid.raw(),
            email,
            profileId,
            passwordHash,
            passwordSalt,
            emailConfirmed,
        });
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
            emailConfirmed: this.emailConfirmed,
        };
    }
}

export { UserEntity };
