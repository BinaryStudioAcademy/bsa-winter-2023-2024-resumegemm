import { type UseFormSetError } from 'react-hook-form';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/data-status.enum';
import { useEffect } from '~/bundles/common/hooks/hooks';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';

type UserAuthDto = UserSignUpRequestDto | UserSignInRequestDto;

type UseFormErrorPayload = {
    setError: UseFormSetError<UserAuthDto>;
};

type ReturnValue = {
    dataStatus: DataStatus;
};

const useFormError = ({ setError }: UseFormErrorPayload): ReturnValue => {
    const { error, dataStatus } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (error && dataStatus === DataStatus.REJECTED) {
            const { errorType, message } = error;
            const fieldName = errorType as keyof UserAuthDto;
            setError(fieldName, {
                message,
            });
        }
    }, [dataStatus, setError, error]);

    return {
        dataStatus,
    };
};

export { useFormError };
