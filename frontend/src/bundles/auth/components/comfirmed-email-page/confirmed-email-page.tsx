import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../components';
import styles from './styles.module.scss';

const EmailConfirmedPage = (): JSX.Element => {
    const [counter, setCounter] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((previousCounter) => previousCounter - 1);
        }, 1000);

        if (counter === 0) {
            clearInterval(timer);
            navigate('/');
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
                </div>
                <div className={styles.confirmed_page__paragraph}>
                    <p className={styles.confirmed_page__text}>
                        You will be redirected on main page in
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

export { EmailConfirmedPage };
