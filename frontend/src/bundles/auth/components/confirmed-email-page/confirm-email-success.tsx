import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { actions as authActions } from '~/bundles/auth/store/auth.store';
import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { Logo } from '../components';
import {
    CONFIRM_EMAIL_TIME,
    CONFIRM_EMAIL_TIMER_INTERVAL,
} from './constants/constants';
import styles from './styles.module.scss';

const ConfirmedEmailSuccess = (): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(authActions.getUser());
    }, [dispatch]);

    const navigate = useNavigate();
    const [counter, setCounter] = useState(CONFIRM_EMAIL_TIME);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((previousCounter) => previousCounter - 1);
        }, CONFIRM_EMAIL_TIMER_INTERVAL);

        if (counter === 0) {
            clearInterval(timer);
            navigate(AppRoute.HOME);
        }

        return () => clearInterval(timer);
    }, [counter, navigate]);

    return (
        <section className={styles.confirmed_page__section}>
            <div className={styles.confirmed_page__block}>
                <div className={styles.confirmed_page__paragraph}>
                    <h3 className={styles.confirmed_page__title}>
                        Congratulations! You are successfully signed up on
                        <div className={styles.confirmed_page__logo_wrapper}>
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
            </div>
        </section>
    );
};

export { ConfirmedEmailSuccess };
