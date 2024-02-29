import { joiResolver } from '@hookform/resolvers/joi';
import {
    type Control,
    type DeepPartial,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormReset,
    type UseFormSetError,
    type UseFormTrigger,
    type UseFormWatch,
    type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '~/bundles/common/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
    defaultValues: DeepPartial<T>;
    validationSchema?: ValidationSchema;
    mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    isValid: boolean;
    handleSubmit: UseFormHandleSubmit<T>;
    reset?: UseFormReset<T>;
    watch: UseFormWatch<T>;
    setError: UseFormSetError<T>;
    trigger: UseFormTrigger<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
    validationSchema,
    defaultValues,
    mode,
}: Parameters<T>): ReturnValue<T> => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        setError,
        trigger,
        formState: { errors, isValid },
    } = useForm<T>({
        mode,
        defaultValues,
        resolver: validationSchema ? joiResolver(validationSchema) : undefined,
    });

    return {
        control,
        isValid,
        errors,
        handleSubmit,
        reset,
        watch,
        setError,
        trigger,
    };
};

export { useAppForm };
