import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { ToastContext } from '~/bundles/toast/context/toast-context.js';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum.js';
import { type UserSignInRequestDto } from '~/bundles/users/users.js';

import { Logo, SignInForm, SignUpForm } from '../components/components.js';
import { PasswordRecovery } from '../components/password-recovery/password-recovery.js';
import { type UserSignUpRequestDtoFrontend } from '../components/sign-up-form/validation/sign-up-validation.js';
import { signIn, signUp } from '../store/actions.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { showToast } = useContext(ToastContext);

    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));

    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDtoFrontend): void => {
            delete payload.confirm_password;
            void dispatch(signUp(payload))
                .unwrap()
                .catch((error: Error) => {
                    showToast(error.message, ToastType.ERROR);
                });
        },
        [dispatch, showToast],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.LOG_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
            case AppRoute.FORGOT_PASSWORD: {
                return <PasswordRecovery />;
            }
        }

        return null;
    };

    return user ? (
        <Navigate to={AppRoute.HOME} />
    ) : (
        <div className={styles.auth}>
            <div className={styles.auth__container}>
                <section className={styles['auth__logo-container']}>
                    <div className={styles.auth__logo}>
                        <Logo />
                    </div>
                </section>
                <section className={styles['auth__form-container']}>
                    <div className={styles['auth__form-content']}>
                        {getScreen(pathname)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export { Auth };
