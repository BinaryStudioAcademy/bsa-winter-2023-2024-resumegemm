import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum.js';
import { showToast } from '~/bundles/toast/helpers/show-toast.js';
import { type UserSignInRequestDto } from '~/bundles/users/users.js';

import { Logo, SignInForm, SignUpForm } from '../components/components.js';
import { PasswordRecovery } from '../components/password-recovery/password-recovery.js';
import { type UserSignUpRequestDtoFrontend } from '../components/sign-up-form/validation/sign-up-validation.js';
import { ExceptionMessage } from '../enums/enums.js';
import { actions as authActions } from '../store/auth.store.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload))
                .unwrap()
                .then()
                .catch((error: Error) => {
                    if (error.message === ExceptionMessage.EMAIL_CONFIRM) {
                        navigate(AppRoute.CHECK_EMAIL);
                    } else {
                        showToast(error.message, ToastType.ERROR);
                    }
                });
        },
        [dispatch, navigate],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDtoFrontend): void => {
            delete payload.confirmPassword;
            void dispatch(authActions.signUp(payload))
                .unwrap()
                .then(() => {
                    navigate(AppRoute.CHECK_EMAIL);
                })
                .catch((error: Error) => {
                    showToast(error.message, ToastType.ERROR, {
                        position: 'top-right',
                    });
                });
        },
        [dispatch, navigate],
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

    return (
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
