import { Elements } from '@stripe/react-stripe-js';
import { type Stripe, loadStripe } from '@stripe/stripe-js';

import { actions as PaymentActions } from '~/bundles/payment/store/payment.store';

import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useState,
} from '../../hooks/hooks';

type Properties = {
    children?: React.ReactNode;
};

const StripeProvider: React.FC<Properties> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

    const publishableKey = useAppSelector(
        ({ payment }) => payment.publishableKey,
    );

    useEffect(() => {
        void dispatch(PaymentActions.getPublishableKey({}));
    }, [dispatch]);

    useEffect(() => {
        if (publishableKey) {
            loadStripe(publishableKey)
                .then((stripeValue) => {
                    setStripePromise(stripeValue);
                })
                .catch((error) => {
                    throw error;
                });
        }
    }, [publishableKey]);

    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export { StripeProvider };
