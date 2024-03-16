import { getCurrencySymbol } from '~/bundles/common/helpers/helpers.js';

import { SubscriptionCard } from '../../components/subscription-card/subscription-card';
import { COINS_IN_BANKNOTE } from '../../constants/payment.constant';
import { type GetPriceResponseDto } from '../../types/types';
import styles from './styles.module.scss';

type SubscriptionPlansProperties = {
    priceId: string;
    prices: GetPriceResponseDto[];
    onSelectPrice: (priceId: string) => void;
};
const SubscriptionPlans: React.FC<SubscriptionPlansProperties> = ({
    priceId,
    prices,
    onSelectPrice,
}) => {
    return (
        <div className={styles.payment_plans__container}>
            <div className={styles.payment_plans__cards}>
                {prices.map((price) => (
                    <SubscriptionCard
                        image={price.product.images}
                        onClick={onSelectPrice}
                        key={price.id}
                        currency={getCurrencySymbol(price.currency)}
                        price={
                            price.unit_amount &&
                            price.unit_amount / COINS_IN_BANKNOTE
                        }
                        priceId={price.id}
                        duration={`${price.recurring.interval_count} ${price.recurring.interval}`}
                        title={price.product.name}
                        description={price.product.description}
                        selected={priceId === price.id}
                    />
                ))}
            </div>
        </div>
    );
};

export { SubscriptionPlans };
