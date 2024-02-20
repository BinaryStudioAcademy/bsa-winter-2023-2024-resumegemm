import { Elements } from '@stripe/react-stripe-js';
import { type Stripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { actions as PaymentActions } from '~/bundles/payment/store/';

import { useAppDispatch, useAppSelector, useEffect, useState } from '../../hooks/hooks';

type Properties = {
    children?: React.ReactNode;
};

const StripeProvider: React.FC<Properties> = ({
    children
}) => {
    const dispatch = useAppDispatch();
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

    const [options, setOptions] = useState<StripeElementsOptions | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    const publishableKey = useAppSelector(({ payment }) => payment.publishableKey);
    const clientSecret = useAppSelector(({ payment }) => payment.clientSecret);

    useEffect(() => {
        void dispatch(PaymentActions.getPublishableKey({}));
        void dispatch(PaymentActions.createPaymentIntent({ amount: 100, currency: 'usd' }));
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

    useEffect(() => {
        if (!clientSecret || options) {
            return;
        }

        setOptions({
            clientSecret: clientSecret
        });
        setLoading(false);
    }, [clientSecret, options]);

    return <>
    {!loading && <Elements stripe={stripePromise} options={options}>
            { children }
        </Elements>
    }
    </>;
};

export { StripeProvider };