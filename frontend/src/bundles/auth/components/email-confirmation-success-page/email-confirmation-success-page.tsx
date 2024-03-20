import { Link, useNavigate } from 'react-router-dom';

import { Icon, RegularButton } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
    ButtonWidth,
    IconName,
    IconSize,
} from '~/bundles/common/enums/enums';
import { useEffect, useState } from '~/bundles/common/hooks/hooks';

import { Logo } from '../components';
import {
    CONFIRM_EMAIL_TIME,
    CONFIRM_EMAIL_TIMER_INTERVAL,
} from '../confirmed-email-page/constants/constants';
import styles from './styles.module.scss';

const EmailConfirmationSuccessPage = (): JSX.Element => {
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
        <section className={styles.email_confirmation_success__section}>
            <div className={styles.email_confirmation_success__block}>
                <div className={styles.email_confirmation_success__paragraph}>
                    <h3 className={styles.email_confirmation_success__title}>
                        Congratulations! You are successfully signed up on
                        <div
                            className={
                                styles.email_confirmation_success__logo_wrapper
                            }
                        >
                            <Logo />
                        </div>
                    </h3>
                    <p className={styles.email_confirmation_success__text}>
                        You will be redirected to the home page in
                        <span
                            className={
                                styles.email_confirmation_success__counter
                            }
                        >
                            {' '}
                            {counter}{' '}
                        </span>
                        seconds
                    </p>
                    <Link to={AppRoute.HOME}>
                        <RegularButton
                            className={
                                styles.email_confirmation_success__button
                            }
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            width={ButtonWidth.FULL}
                        >
                            Go to Home page
                            <Icon
                                size={IconSize.LARGE}
                                name={IconName.ARROW_RIGHT}
                            />
                        </RegularButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export { EmailConfirmationSuccessPage };
