import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';

import styles from './styles.module.scss';

const ConfirmedEmailFail = (): JSX.Element => {
    return (
        <section className={styles.confirmed_page__section}>
            <div className={styles.confirmed_page__block}>
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
            </div>
        </section>
    );
};

export { ConfirmedEmailFail };
