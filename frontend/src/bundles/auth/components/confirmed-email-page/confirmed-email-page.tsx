import { Navigate, useSearchParams } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';

import { actions as authActionCreator } from '../../store/auth.store';

const ConfirmedEmailPage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [searchParameters] = useSearchParams();
    const token = searchParameters.get('token');

    const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);

    const handleConfirmEmail = useCallback(async (): Promise<void> => {
        if (token) {
            await dispatch(
                authActionCreator.confirmEmail({ emailConfirmToken: token }),
            );
        }
    }, [token, dispatch]);

    useEffect(() => {
        handleConfirmEmail()
            .then(() => {
                setIsEmailConfirmed(true);
            })
            .catch(() => {
                setIsEmailConfirmed(false);
            });
    }, [handleConfirmEmail]);

    return isEmailConfirmed ? (
        <Navigate to={AppRoute.CONFIRM_EMAIL_SUCCESS} />
    ) : (
        <Navigate to={AppRoute.CONFIRM_EMAIL_FAIL} />
    );
};

export { ConfirmedEmailPage };
