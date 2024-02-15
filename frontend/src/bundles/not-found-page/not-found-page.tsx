import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../common/components/components';
import { AppRoute } from '../common/enums/app-route.enum';
import styles from './styles.module.scss';

const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate();

    const navigateHome = useCallback((): void => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return <div className={styles.not_found_page__container}>
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
                Oops, no resume for you here. Sorry about that! Try searching elsewhere or reaching out for help.
            </p>
            <Button onClick={navigateHome}>
                <p>Go home</p>
            </Button>
        </div>
    </div>;
};

export {
    NotFoundPage
};
