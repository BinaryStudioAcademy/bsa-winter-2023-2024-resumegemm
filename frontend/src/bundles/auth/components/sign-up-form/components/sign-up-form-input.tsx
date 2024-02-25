import clsx from 'clsx';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    placeholder?: string;
    type?: 'text' | 'email';
};

const Input = <T extends FieldValues>({
    control,
    errors,
    name,
    placeholder = '',
    type = 'text',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <label>
            <input
                {...field}
                type={type}
                placeholder={placeholder}
                className={clsx(styles.input, {
                    [styles.input__error]: hasError,
                })}
                style={{ width: '100%' }}
            />
            {hasError && <span>{error as string}</span>}
        </label>
    );
};

export { Input };
