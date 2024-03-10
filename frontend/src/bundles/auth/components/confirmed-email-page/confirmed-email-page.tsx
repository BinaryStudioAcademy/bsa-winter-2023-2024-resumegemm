import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { actions as authActionCreator } from '../../store/auth.store';
import { Logo } from '../components';
import {
    CONFIRM_EMAIL_TIME,
    CONFIRM_EMAIL_TIMER_INTERVAL,
} from './constants/constants';
import styles from './styles.module.scss';

const ConfirmedEmailPage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [searchParameters] = useSearchParams();
    const token = searchParameters.get('token');

    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
    const [counter, setCounter] = useState(CONFIRM_EMAIL_TIME);

    const handleConfirmEmail = useCallback(() => {
        if (token) {
            void dispatch(
                authActionCreator.confirmEmail({ emailConfirmToken: token }),
            );
        }
        setIsEmailConfirmed(true);
    }, [token, dispatch]);

    useEffect(() => {
        handleConfirmEmail();
    }, [handleConfirmEmail]);

    useEffect(() => {
        if (isEmailConfirmed) {
            const timer = setInterval(() => {
                setCounter((previousCounter) => previousCounter - 1);
            }, CONFIRM_EMAIL_TIMER_INTERVAL);

            if (counter === 0) {
                clearInterval(timer);
                navigate(AppRoute.HOME);
            }

            return () => clearInterval(timer);
        }
    }, [isEmailConfirmed, counter, navigate]);

    return (
        <section className={styles.confirmed_page__section}>
            <div className={styles.confirmed_page__block}>
                {isEmailConfirmed ? (
                    <div className={styles.confirmed_page__paragraph}>
                        <h3 className={styles.confirmed_page__title}>
                            Congratulations! You are successfully signed up on
                            <div
                                className={styles.confirmed_page__logo_wrapper}
                            >
                                <Logo />
                            </div>
                        </h3>
                        <p className={styles.confirmed_page__text}>
                            You will be redirected to the main page in
                            <span className={styles.confirmed_page__counter}>
                                {' '}
                                {counter}{' '}
                            </span>
                            seconds
                        </p>
                    </div>
                ) : (
                    <div className={styles.confirmed_page__paragraph}>
                        <h3 className={styles.confirmed_page__title}>
                            Email Confirmation Failed
                        </h3>
                        <p className={styles.confirmed_page__text}>
                            Email confirmation failed. Please try again later.
                        </p>
                        <p className={styles.confirmed_page__text}>
                            You can{' '}
                            <Link
                                to={AppRoute.SIGN_UP}
                                className={styles.sing_up__link}
                            >
                                Sign Up here
                            </Link>
                            .
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export { ConfirmedEmailPage };
