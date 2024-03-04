import {
    type UserEntityFields,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserVerifyResetTokenRequestDto,
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
    verifyResetToken<T>(token: string): T;
    tokenEqualsEmail(
        payload: UserVerifyResetTokenRequestDto,
    ): Promise<UserEntityFields>;
    createResetToken(email: UserForgotPasswordRequestDto): Promise<string>;
    resetPassword(
        payload: UserResetPasswordRequestDto,
    ): Promise<Omit<UserResetPasswordResponse, 'message'>>;
};

export { type AuthService };
