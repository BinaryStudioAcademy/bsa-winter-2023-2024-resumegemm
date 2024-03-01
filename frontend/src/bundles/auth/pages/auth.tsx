import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/bundles/users/users.js';

import { Logo, SignInForm, SignUpForm } from '../components/components.js';
import { type UserSignUpRequestDtoFrontend } from '../components/sign-up-form/validation/sign-up-validation.js';
import { actions as authActions } from '../store/index';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDtoFrontend): void => {
            delete payload.confirm_password;
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.LOG_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
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
