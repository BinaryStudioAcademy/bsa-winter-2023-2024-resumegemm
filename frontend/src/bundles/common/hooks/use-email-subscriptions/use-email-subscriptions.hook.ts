import { useCallback } from 'react';

import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { type DataStatus } from '../../enums/data-status.enum';
import { useAppDispatch, useAppSelector } from '../hooks';

type ReturnValue = {
    handleSubscribe: () => void;
    handleUnsubscribe: () => void;
    isEmailSubscriptionLoading: DataStatus;
};

const useEmailSubscriptions = (): ReturnValue => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isEmailSubscriptionLoading = useAppSelector(
        (state) => state.emailSubscription.dataStatus,
    );

    const handleSubscribe = useCallback(() => {
        void dispatch(subscribe()).then(() => {
            showToast('Subscribed to email notifications', ToastType.SUCCESS);
        });
    }, [dispatch]);

    const handleUnsubscribe = useCallback(() => {
        if (user?.emailSubscription) {
            void dispatch(unsubscribe({ id: user.emailSubscription.id })).then(
                () => {
                    showToast(
                        'Unsubscribed from email notifications',
                        ToastType.SUCCESS,
                    );
                },
            );
        }
    }, [dispatch, user]);

    return {
        handleSubscribe,
        handleUnsubscribe,
        isEmailSubscriptionLoading,
    };
};

export { useEmailSubscriptions };
