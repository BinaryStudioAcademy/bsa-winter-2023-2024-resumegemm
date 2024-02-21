import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { Logo, SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
        
    const { dataStatus, user } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
        user: auth.user
    }));

    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        user
        ? <Navigate to={AppRoute.ROOT}/>
        :<div className={styles.auth}>
            <div className={styles.auth__container}>
                <section className={styles['auth__logo-container']}>
                    <div className={styles.auth__logo}>
                        <Logo />
                    </div>
                </section>
                <section className={styles['auth__form-container']}>
                    <div className={styles['auth__form-content']}>
                        state: {dataStatus}
                        {getScreen(pathname)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export { Auth };
