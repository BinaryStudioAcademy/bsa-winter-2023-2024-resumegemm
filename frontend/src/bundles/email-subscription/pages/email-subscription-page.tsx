import { useParams } from 'react-router-dom';

import { DataStatus } from '~/bundles/common/enums/data-status.enum';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';

import { unsubscribe } from '../store/actions';
import styles from './styles.module.scss';

const EmailSubscriptionPage: React.FC = () => {
    const parameters = useParams();
    const dispatch = useAppDispatch();
    const isEmailSubscriptionLoading = useAppSelector(
        (state) => state.emailSubscription.dataStatus,
    );

    useEffect(() => {
        if (parameters.id) {
            void dispatch(unsubscribe({ id: parameters.id }));
        }
    }, [dispatch, parameters.id]);

    return (
        <div className={styles.email_subscription}>
            {isEmailSubscriptionLoading === DataStatus.PENDING ? (
                <p>Wait...</p>
            ) : (
                <p>You have been unsubscribed from email notifications.</p>
            )}
        </div>
    );
};

export { EmailSubscriptionPage };
