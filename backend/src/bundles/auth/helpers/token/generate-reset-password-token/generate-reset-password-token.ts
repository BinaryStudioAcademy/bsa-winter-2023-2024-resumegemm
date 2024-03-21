import { randomBytes } from 'node:crypto';

const generateResetPasswordToken = (): string => {
    return randomBytes(12).toString('hex');
};

export { generateResetPasswordToken };
