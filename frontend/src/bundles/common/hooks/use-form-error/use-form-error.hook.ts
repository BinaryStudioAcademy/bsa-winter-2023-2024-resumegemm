import { type UseFormSetError } from 'react-hook-form';

import { type DataStatus } from '~/bundles/common/enums/data-status.enum';
import { useEffect } from '~/bundles/common/hooks/hooks';
import { useAppSelector } from '~/bundles/common/hooks/use-app-selector/use-app-selector.hook';

type ErrorFieldValues = {
    email: string;
    password: string;
};

type UseFormErrorPayload = {
    setError: UseFormSetError<ErrorFieldValues>;
};

type ReturnValue = {
    dataStatus: DataStatus;
};

const useFormError = ({ setError }: UseFormErrorPayload): ReturnValue => {
    const { error, dataStatus } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            const { errorType, message } = error;
            const fieldName = errorType as keyof ErrorFieldValues;
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
