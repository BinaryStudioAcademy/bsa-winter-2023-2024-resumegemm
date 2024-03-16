import { Link } from 'react-router-dom';

import { RegularButton } from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type PaymentSuccessProperties = {
    userName: string;
    startDate: string | undefined;
    endDate: string | undefined;
};

const PaymentSuccess: React.FC<PaymentSuccessProperties> = ({
    userName,
    startDate,
    endDate,
}) => {
    return (
        <div className={styles.payment_success}>
            <div className={styles.payment_success__title}>
                You are now subscribed!
            </div>
            <div>
                Dear,
                <span className={styles.payment_success__main_text}>
                    {' '}
                    {userName}
                </span>
            </div>
            <p className={styles.payment_success__text}>
                Welcome to ResumeGemm! We are delighted to have you on board as
                a subscriber.
            </p>
            {startDate && endDate && (
                <p className={styles.payment_success__text}>
                    Your subscription is now active, starting from{' '}
                    <span className={styles.payment_success__date}>
                        {startDate}
                    </span>{' '}
                    and ending{' '}
                    <span className={styles.payment_success__date}>
                        {endDate}
                    </span>
                    . During this time you will enjoy exclusive access to
                    content, early updates, and special offers tailored just for
                    you.
                </p>
            )}
            <p className={styles.payment_success__text}>
                If you have any question or need assistance feel free to contact
                our support team!
            </p>
            <p>Thank you for choosing ResumeGemm!</p>
            <Link to={AppRoute.HOME}>
                <RegularButton
                    className={styles.payment_success__button}
                    variant={ButtonVariant.SQUARE_ORANGE}
                    size={ButtonSize.MEDIUM}
                >
                    Home
                </RegularButton>
            </Link>
        </div>
    );
};

export { PaymentSuccess };
