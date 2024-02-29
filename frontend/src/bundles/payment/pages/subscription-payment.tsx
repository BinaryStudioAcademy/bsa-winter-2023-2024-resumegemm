import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { type ChangeEvent, type FormEvent, useEffect } from 'react';
import { useCallback, useState } from 'react';

import { Input, RegularButton } from '~/bundles/common/components/components';
import { ButtonWidth } from '~/bundles/common/enums/components/button-width.enum';
import { ButtonType, ButtonVariant } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { SubscriptionCard } from '../components/subscription-card';
import { coinsInBanknote } from '../constants/payment.constant';
import { PaymentMessage } from '../enums/messages';
import { createSubscription, getPrices } from '../store/actions';
import { type CreateSubscriptionResponseDto } from '../types/types';
import { paymentCreateSubscriptionValidationSchema } from '../validation-schemas/validation-schemas';
import styles from './styles.module.scss';

const SubscriptionPaymentPage: React.FC = () => {
    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useAppDispatch();

    const { prices } = useAppSelector(({ payment }) => ({
        prices: payment.prices,
    }));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [priceId, setPriceId] = useState('');

    const [modalIsHidden, setModalIsHidden] = useState(true);

    const [processing, setProcessing] = useState(false);

    const handleNameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setName(event.currentTarget.value);
        },
        [],
    );

    const handleEmailChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.currentTarget.value);
        },
        [],
    );

    const handlePriceChange = useCallback((id: string) => {
        return function () {
            setPriceId(id);
            setModalIsHidden(false);
        };
    }, []);

    const closeModal = useCallback(() => {
        setModalIsHidden(true);
    }, []);

    const HandleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>): void => {
            async function HandleSubmitAsync(): Promise<void> {
                try {
                    setProcessing(true);

                    event.preventDefault();

                    if (!stripe || !elements) {
                        return;
                    }

                    const paymentMethod = await stripe.createPaymentMethod({
                        elements,
                        params: {
                            type: 'card',
                            billing_details: {
                                name,
                                email,
                            },
                        },
                    });

                    if (paymentMethod.error?.message) {
                        showToast(paymentMethod.error.message, ToastType.ERROR);
                        return;
                    }

                    if (!paymentMethod.paymentMethod) {
                        showToast(
                            PaymentMessage.PAYMENT_METHOD_ERROR,
                            ToastType.ERROR,
                        );
                        return;
                    }

                    const request = {
                        name,
                        email,
                        priceId,
                        paymentMethod: paymentMethod.paymentMethod.id,
                    };

                    const { error } =
                        paymentCreateSubscriptionValidationSchema.validate(
                            request,
                        );

                    if (error) {
                        showToast(error.message, ToastType.ERROR);
                        return;
                    }

                    const { payload } = (await dispatch(
                        createSubscription(request),
                    )) as { payload: CreateSubscriptionResponseDto | null };

                    if (!payload?.clientSecret) {
                        showToast(
                            PaymentMessage.BLANK_SECRET_KEY,
                            ToastType.ERROR,
                        );
                        return;
                    }

                    const confirmPayment = await stripe.confirmCardPayment(
                        payload.clientSecret,
                    );

                    if (confirmPayment.error?.message) {
                        showToast(
                            confirmPayment.error.message,
                            ToastType.ERROR,
                        );
                        return;
                    }

                    showToast(PaymentMessage.SUCCESS, ToastType.SUCCESS);
                } catch {
                    showToast(PaymentMessage.DEFAULT_MESSAGE, ToastType.ERROR);
                } finally {
                    setProcessing(false);
                }
            }

            void HandleSubmitAsync();
        },
        [elements, stripe, dispatch, name, email, priceId],
    );

    useEffect(() => {
        void dispatch(getPrices({}));
    }, [dispatch]);

    return (
        <div className={styles.payment__container}>
            <form className={styles.payment__form} onSubmit={HandleSubmit}>
                <div className={styles.payment__prices_container}>
                    {prices.map((price) => (
                        <SubscriptionCard
                            image={price.product.images}
                            onClick={handlePriceChange(price.id)}
                            key={price.id}
                            price={
                                price.unit_amount &&
                                price.unit_amount / coinsInBanknote
                            }
                            currency={price.currency}
                            duration={`${price.recurring.interval_count} ${price.recurring.interval}`}
                            title={price.product.name}
                            description={price.product.description}
                            selected={priceId === price.id}
                        />
                    ))}
                </div>

                {!modalIsHidden && (
                    <div className={styles.payment__modal_container}>
                        <div className={styles.payment__modal_input_container}>
                            <button
                                onClick={closeModal}
                                className={styles.payment__modal_close_button}
                            ></button>

                            <Input
                                width="100%"
                                placeholder="Name"
                                onChange={handleNameChange}
                            />
                            <Input
                                width="100%"
                                placeholder="email"
                                onChange={handleEmailChange}
                            />

                            <CardElement
                                className={styles.payment__modal_input_card}
                            />

                            <RegularButton
                                className={styles.payment__modal_input_button}
                                type={ButtonType.SUBMIT}
                                width={ButtonWidth.FULL}
                                isDisabled={processing}
                                variant={ButtonVariant.PRIMARY}
                            >
                                Confirm payment
                            </RegularButton>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export { SubscriptionPaymentPage };
