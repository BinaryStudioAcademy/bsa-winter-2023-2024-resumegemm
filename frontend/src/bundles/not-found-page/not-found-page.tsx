import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegularButton } from '../common/components/components';
import { AppRoute } from '../common/enums/app-route.enum';
import { ButtonVariant } from '../common/enums/enums';
import styles from './styles.module.scss';

const NotFoundPage = (): JSX.Element => {
    useEffect(() => {
        document.title = '404 | This page could not be found';
    }, []);

    const navigate = useNavigate();

    const navigateHome = useCallback((): void => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return (
        <div className={styles.not_found_page__container}>
            <div className={styles.not_found_page__content_container}>
                <h1 className={styles.not_found_page__title}>
                    4
                    <span className={styles.not_found_page__title_marked}>
                        0
                    </span>
                    4
                </h1>
                <h3 className={styles.not_found_page__subtitle}>
                    Page Not Found
                </h3>
                <p className={styles.not_found_page__text}>
                    Oops, no resume for you here. Sorry about that! Try
                    searching elsewhere or reaching out for help.
                </p>
                <RegularButton
                    variant={ButtonVariant.PRIMARY}
                    onClick={navigateHome}
                >
                    <p>Go home</p>
                </RegularButton>
            </div>
        </div>
    );
};

export { NotFoundPage };
