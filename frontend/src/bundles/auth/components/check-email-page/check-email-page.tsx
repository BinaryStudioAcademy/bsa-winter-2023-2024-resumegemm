import { Link, useNavigate } from 'react-router-dom';

import clockwise from '~/assets/img/clockwise.png';
import logo from '~/assets/img/logo.svg';
import { Icon, IconButton } from '~/bundles/common/components/components';
import { AppRoute, IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const CheckEmailPage = (): JSX.Element => {
    const navigate = useNavigate();
    const handleClose = useCallback(() => {
        navigate(AppRoute.ROOT);
    }, [navigate]);

    return (
        <div className={styles.check_email__container}>
            <div className={styles.check_email__head}>
                <div className={styles.check_email__home_link}>
                    <Link to={AppRoute.ROOT}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div>
                    <IconButton onClick={handleClose}>
                        <Icon
                            name={IconName.CLOSE_CROSS}
                            size={IconSize.LARGE}
                        />
                    </IconButton>
                </div>
            </div>
            <div className={styles.check_email__image}>
                <img src={clockwise} alt="clock" />
            </div>
            <div className={styles.check_email__header}>Check your inbox</div>
            <div className={styles.check_email__text_block}>
                <p className={styles.check_email__text}>
                    We just emailed confirmation link to your email
                </p>
                <p className={styles.check_email__text}>
                    Click the link, and you will be signed in.
                </p>
            </div>
        </div>
    );
};

export { CheckEmailPage };
