import { useSearchParams } from 'react-router-dom';

import { Spinner } from '~/bundles/common/components/components';
import { DataStatus, SpinnerVariant } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';

import { actions as authActionCreator } from '../../store/auth.store';
import {
    EmailConfirmationFailPage,
    EmailConfirmationSuccessPage,
} from '../components';
import styles from './styles.module.scss';

const EmailConfirmationPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [searchParameters] = useSearchParams();
    const token = searchParameters.get('token');

    const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);

    const handleConfirmEmail = useCallback(async (): Promise<
        string | undefined
    > => {
        if (token) {
            const { meta } = await dispatch(
                authActionCreator.confirmEmail({
                    emailConfirmToken: token,
                }),
            );

            return meta.requestStatus;
        }
    }, [dispatch, token]);

    useEffect(() => {
        handleConfirmEmail()
            .then((response) => {
                if (response === DataStatus.FULFILLED) {
                    setIsConfirmed(true);
                } else if (response === DataStatus.REJECTED) {
                    setIsConfirmed(false);
                }
            })
            .catch(() => setIsConfirmed(null));
    }, [dispatch, token, handleConfirmEmail]);

    return (
        <>
            {isConfirmed === undefined && (
                <div className={styles.email_confirmation_spinner}>
                    <Spinner variant={SpinnerVariant.MEDIUM} />
                </div>
            )}
            {isConfirmed === true && <EmailConfirmationSuccessPage />}
            {isConfirmed === false && <EmailConfirmationFailPage />}
        </>
    );
};

export { EmailConfirmationPage };
