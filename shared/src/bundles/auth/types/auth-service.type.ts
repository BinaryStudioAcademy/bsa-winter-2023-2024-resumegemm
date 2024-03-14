import {
    type UserEntityFields,
    type UserForgotPasswordRequestDto,
    type UserResetPasswordRequestDto,
    type UserResetPasswordResponse,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
    type UserVerifyResetPasswordTokenRequestDto,
    type UserWithProfileRelation,
    type UserWithRelations,
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
    getUserWithProfile(id: string): Promise<UserWithRelations>;
    verifyToken<T>(token: string, tokenSecret: string): T;
    tokenEqualsEmail(
        payload: UserVerifyResetPasswordTokenRequestDto,
    ): Promise<UserEntityFields>;
    createResetPasswordToken(
        email: UserForgotPasswordRequestDto,
    ): Promise<string>;
    resetPassword(
        payload: UserResetPasswordRequestDto,
    ): Promise<Omit<UserResetPasswordResponse, 'message'>>;
};

export { type AuthService };
