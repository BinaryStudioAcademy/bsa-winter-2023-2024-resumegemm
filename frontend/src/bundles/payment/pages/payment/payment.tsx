import { useElements, useStripe } from '@stripe/react-stripe-js';
import { type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/img/logo.svg';
import {
    Icon,
    IconButton,
    Stepper,
} from '~/bundles/common/components/components';
import { AppRoute, IconName, IconSize } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { PaymentMessage } from '../../enums/messages';
import { steps } from '../../steps/steps';
import { createSubscription, getPrices } from '../../store/actions';
import {
    type CreateSubscriptionResponseDto,
    type GetPriceResponseDto,
} from '../../types/types';
import { paymentCreateSubscriptionValidationSchema } from '../../validation-schemas/validation-schemas';
import { SubscriptionPaymentPage } from '../subscription-payment/subscription-payment';
import { SubscriptionPlans } from '../subscription-plans/subscription-plans';
import styles from './styles.module.scss';

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);

    const handleClose = useCallback(() => {
        navigate(AppRoute.HOME);
    }, [navigate]);

    const elements = useElements();
    const stripe = useStripe();
    const dispatch = useAppDispatch();

    const { prices } = useAppSelector(({ payment }) => ({
        prices: payment.prices,
    }));

    useEffect(() => {
        void dispatch(getPrices({}));
    }, [dispatch]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [priceId] = useState('');
    const [selectedPrice] = useState<GetPriceResponseDto>();

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

    const handleChangeActiveStep = useCallback(() => {
        setActiveStep((activeStep) => activeStep + 1);
    }, []);

    const handleSelectPrice = useCallback(() => {
        // setPriceId(priceId);
        handleChangeActiveStep();
    }, [handleChangeActiveStep]);

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>): void => {
            async function handleSubmitAsync(): Promise<void> {
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

            void handleSubmitAsync();
            handleChangeActiveStep();
        },
        [
            elements,
            stripe,
            dispatch,
            name,
            email,
            priceId,
            handleChangeActiveStep,
        ],
    );

    return (
        <div className={styles.billing_page}>
            <div className={styles.billing_page__head}>
                <div className={styles.billing_page__logo}>
                    <Link to={AppRoute.HOME}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Stepper
                    className={styles.billing_page__stepper}
                    steps={steps}
                    activeStep={activeStep}
                />
                <div className={styles.billing_page__cross_button}>
                    <IconButton onClick={handleClose}>
                        <Icon
                            size={IconSize.LARGE}
                            name={IconName.CLOSE_CROSS}
                        />
                    </IconButton>
                </div>
            </div>

            <div className={styles.billing_page__content}>
                <div className={styles.billing_page__text_content}>
                    <div className={styles.billing_page__title}>
                        {' '}
                        Download Your Attention-Grabbing Resume Now!
                    </div>
                    <div className={styles.billing_page__text}>
                        {' '}
                        To download your resume simply sign up for your Premium
                        Membership. As an added bonus, you’ll gain instant
                        access to our Premium Templates and Color Palette.
                    </div>
                </div>
                {activeStep === 1 && (
                    <SubscriptionPlans
                        priceId={priceId}
                        prices={prices}
                        onSelectPrice={handleSelectPrice}
                    />
                )}

                {activeStep === 2 && (
                    <SubscriptionPaymentPage
                        price={selectedPrice}
                        onPaymentSubmit={handleSubmit}
                        onChangeEmail={handleEmailChange}
                        onChangeName={handleNameChange}
                        processing={processing}
                    />
                )}
            </div>
        </div>
    );
};

export { Payment };
