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
    label: string;
    name: FieldPath<T>;
    placeholder?: string;
    type?: 'text' | 'email';
    disabled?: boolean;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder = '',
    type = 'text',
    disabled = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);
    return (
        <label className={styles.label}>
            <span className={styles.labelName}>{label}</span>
            <input
                className={`
                ${styles.input}
                ${hasError && !disabled && styles.error}
                ${!hasError && field.value.length > 0 && styles.filled}
                ${disabled && styles.disabled}
                `}
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
            />
            {hasError && !disabled && (
                <span className={styles.errorText}>{error as string}</span>
            )}
        </label>
    );
};

export { Input };
