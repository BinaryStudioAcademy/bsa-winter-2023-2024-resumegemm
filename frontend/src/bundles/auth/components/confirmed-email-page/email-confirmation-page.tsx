import { Navigate, useSearchParams } from 'react-router-dom';

import { Spinner } from '~/bundles/common/components/components';
import {
    AppRoute,
    DataStatus,
    SpinnerVariant,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';

import { actions as authActionCreator } from '../../store/auth.store';

const EmailConfirmationPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [searchParameters] = useSearchParams();
    const token = searchParameters.get('token');

    const [isConfirmed, setIsConfirmed] = useState<boolean | undefined>();

    const handleConfirmEmail = useCallback(async (): Promise<void> => {
        if (token) {
            const response = await dispatch(
                authActionCreator.confirmEmail({
                    emailConfirmToken: token,
                }),
            );

            if (response.meta.requestStatus === DataStatus.FULFILLED) {
                setIsConfirmed(true);
            } else if (response.meta.requestStatus === DataStatus.REJECTED) {
                setIsConfirmed(false);
            }
        }
    }, [dispatch, token]);

    useEffect(() => {
        handleConfirmEmail()
            .then(() => setIsConfirmed(true))
            .catch(() => setIsConfirmed(false));
    }, [dispatch, token, handleConfirmEmail]);

    return (
        <>
            {isConfirmed === undefined && (
                <Spinner variant={SpinnerVariant.MEDIUM} />
            )}
            {isConfirmed === true && (
                <Navigate to={AppRoute.EMAIL_CONFIRMATION_SUCCESS} />
            )}
            {isConfirmed === false && (
                <Navigate to={AppRoute.EMAIL_CONFIRMATION_FAIL} />
            )}
        </>
    );
};

export { EmailConfirmationPage };
