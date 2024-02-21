import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
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

    verifyToken<T>(token: string, isRefreshToken?: boolean): T;
};

export { type AuthService };
