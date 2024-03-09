import {
    type UserConfirmEmailRequestDto,
    type UserConfirmEmailResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserWithProfileRelation,
} from '../../users/users.js';
import { type EncryptionDataPayload } from './encryption-data-payload.type.js';

type AuthService = {
    signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto>;

    login({
        email,
        password,
    }: UserSignInRequestDto): Promise<UserSignInResponseDto>;

    generateSalt(): Promise<string>;
    encrypt(data: string, salt: string): Promise<string>;
    compare(encryptionData: EncryptionDataPayload): Promise<boolean>;
    getUserWithProfile(id: string): Promise<UserWithProfileRelation>;
    verifyToken<T>(token: string, tokenSecret: string): T;
    confirmUserEmail(
        payload: UserConfirmEmailRequestDto,
    ): Promise<Omit<UserConfirmEmailResponse, 'message'>>;
};

export { type AuthService };
