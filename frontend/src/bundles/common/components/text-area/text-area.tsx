import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '../../hooks/hooks';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    placeholder?: string;
    disabled?: boolean;
};

const TextArea = <T extends FieldValues>({
    control,
    errors,
    label = '',
    name,
    placeholder = '',
    disabled = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);
    return (
        <label className={styles.label}>
            <span>{label}</span>
            <textarea
                className={`
            ${styles.textArea}
            ${disabled && styles.disabled}
            ${hasError && !disabled && styles.error}
            ${!hasError && field.value.length > 0 && styles.filled}
            `}
                {...field}
                placeholder={placeholder}
                disabled={disabled}
            ></textarea>
            {hasError && !disabled && (
                <span className={styles.errorText}>{error as string}</span>
            )}
        </label>
    );
};

export { TextArea };
