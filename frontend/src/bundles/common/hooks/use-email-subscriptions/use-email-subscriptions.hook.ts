import { DataStatus } from '~/bundles/common/enums/enums';
import {
    subscribe,
    unsubscribe,
} from '~/bundles/email-subscription/store/actions';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '../hooks';

type ReturnValue = {
    handleSubscribe: () => void;
    handleUnsubscribe: () => void;
    isEmailSubscriptionLoading: boolean;
    handleModalOpen: () => void;
    handleModalClose: () => void;
    isModalOpen: boolean;
    toggleItemProperties: {
        title: string;
        info: string;
        onClick: () => void;
        isLoading: boolean;
        buttonText: string;
    };
};

const useEmailSubscriptions = (): ReturnValue => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isEmailSubscriptionLoading = useAppSelector(
        (state) => state.emailSubscription.dataStatus === DataStatus.PENDING,
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleSubscribe = useCallback(() => {
        void dispatch(subscribe())
            .unwrap()
            .then(() => {
                showToast(
                    'Subscribed to email notifications',
                    ToastType.SUCCESS,
                );
            });
    }, [dispatch]);

    const handleUnsubscribe = useCallback(() => {
        if (user?.emailSubscription) {
            void dispatch(unsubscribe({ id: user.emailSubscription.id }))
                .unwrap()
                .then(() => {
                    showToast(
                        'Unsubscribed from email notifications',
                        ToastType.SUCCESS,
                    );
                    handleModalClose();
                });
        }
    }, [dispatch, handleModalClose, user]);

    const toggleItemProperties = user?.emailSubscription
        ? {
              title: 'Email notifications',
              info: 'Unsubscribe from email notifications.',
              onClick: handleModalOpen,
              isLoading: isEmailSubscriptionLoading,
              buttonText: 'Unsubscribe',
          }
        : {
              title: 'Email notifications',
              info: 'Subscribe to email notifications.',
              onClick: handleSubscribe,
              isLoading: isEmailSubscriptionLoading,
              buttonText: 'Subscribe',
          };

    return {
        handleSubscribe,
        handleUnsubscribe,
        isEmailSubscriptionLoading,
        handleModalOpen,
        handleModalClose,
        isModalOpen,
        toggleItemProperties,
    };
};

export { useEmailSubscriptions };
