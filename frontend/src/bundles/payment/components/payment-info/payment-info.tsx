import { Icon } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

const paymentFeatures = [
    { title: 'Payment through a trusted payment service' },
    { title: 'SSL Secure / 256-bit SSL secure checkout' },
    { title: ' 7-day money back guarantee' },
];

const PaymentInfo: React.FC = () => {
    return (
        <div className={styles.payment_info}>
            <div className={styles.payment_info__title}>Get your dream job</div>
            <div className={styles.payment_info_features}>
                {paymentFeatures.map((feature, index) => (
                    <div
                        key={index}
                        className={styles.payment_info_features__item}
                    >
                        <Icon name={IconName.CHECK} size={IconSize.SMALL} />
                        {feature.title}
                    </div>
                ))}
            </div>
            <div className={styles.payment_info_questions}>
                <div className={styles.payment_info_questions__title}>
                    How can I cancel
                </div>
                <div className={styles.payment_info_questions__answer}>
                    You can easily cancel your subscription by simply contacting
                    our support team via email or telephone, or by doing it
                    yourself on the “Account Settings” page
                </div>
            </div>
            <div className={styles.payment_info_questions__title}>
                Money-Back Guarantee!
            </div>
            <div className={styles.payment_info_questions__answer}>
                If you are not fully satisfied and still within the 7 day trial
                period, simply let us know and we will happily process a full
                refund
            </div>
        </div>
    );
};

export { PaymentInfo };
