import { useSearchParams } from 'react-router-dom';
import {
    type UserForgotPasswordRequestDto,
    type UserVerifyResetTokenRequestDto,
} from 'shared/build/index.js';

import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { actions as authActions } from '../../store/index.js';
import { RecoveryStage } from './enums/enums.js';
import { RecoveryCodeForm } from './recovery-code.js';
import { RecoveryEmailForm } from './recovery-email.js';
import { ResetPasswordForm } from './reset-password.js';

const PasswordRecovery: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParameters, setSearchParameters] = useSearchParams();
    const [resetToken, setResetToken] = useState('');
    const [email, setEmail] = useState('');

    const currentStage = searchParameters.get('stage');

    const handleEmailSubmit = useCallback(
        async ({ email }: UserForgotPasswordRequestDto): Promise<void> => {
            const response = await dispatch(
                authActions.forgotPassword({ email }),
            );

            if (response.meta.requestStatus === 'fulfilled') {
                setSearchParameters({ stage: RecoveryStage.CODE });

                setEmail(email);
            }
        },
        [setSearchParameters, dispatch],
    );

    const handleCodeSubmit = useCallback(
        async ({
            resetToken,
        }: UserVerifyResetTokenRequestDto): Promise<void> => {
            const response = await dispatch(
                authActions.verifyResetToken({ resetToken, email }),
            );

            if (response.meta.requestStatus === 'fulfilled') {
                setSearchParameters({ stage: RecoveryStage.PASSWORD });

                setResetToken(resetToken);
            }
        },
        [setSearchParameters, dispatch, email],
    );

    const handlePasswordSubmit = useCallback(
        async ({ password }: { password: string }): Promise<void> => {
            const response = await dispatch(
                authActions.resetPassword({
                    password,
                    resetToken,
                }),
            );

            if (response.meta.requestStatus === 'rejected') {
                return;
            }
        },
        [dispatch, resetToken],
    );

    const getCurrentStage = (currentStage: string | null): React.ReactNode => {
        switch (currentStage) {
            case RecoveryStage.CODE: {
                return <RecoveryCodeForm onSubmit={handleCodeSubmit} />;
            }
            case RecoveryStage.PASSWORD: {
                return <ResetPasswordForm onSubmit={handlePasswordSubmit} />;
            }
            default: {
                return <RecoveryEmailForm onSubmit={handleEmailSubmit} />;
            }
        }
    };

    return <>{getCurrentStage(currentStage)}</>;
};

export { PasswordRecovery };