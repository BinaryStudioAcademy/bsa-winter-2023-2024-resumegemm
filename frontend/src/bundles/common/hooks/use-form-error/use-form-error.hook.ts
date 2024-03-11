import { type UseFormSetError } from 'react-hook-form';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from 'shared/build';

import { type DataStatus } from '~/bundles/common/enums/data-status.enum';
import { useAppSelector, useEffect } from '~/bundles/common/hooks/hooks';

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
        if (error) {
            const { errorType, message } = error;
            const fieldName = errorType?.toLowerCase() as keyof UserAuthDto;
            setError(fieldName, {
                message,
            });
        }
    }, [setError, error]);

    return {
        dataStatus,
    };
};

export { useFormError };
