import clsx from 'clsx';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Icon, IconButton } from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
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
        <label style={{ position: 'relative' }}>
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

const PasswordInput = <T extends FieldValues>({
    control,
    errors,
    name,
    placeholder = '',
}: Properties<T>): JSX.Element => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback((): void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <>
            <label style={{ position: 'relative' }}>
                <input
                    {...field}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={clsx(styles.input, {
                        [styles.input__error]: hasError,
                    })}
                    style={{ width: '100%' }}
                />
                <IconButton
                    className={styles.password__icon}
                    onClick={togglePasswordVisibility}
                >
                    <Icon
                        size={IconSize.SMALL}
                        name={
                            isPasswordVisible
                                ? IconName.EYE_OPEN
                                : IconName.EYE_SLASH
                        }
                    />
                </IconButton>
            </label>
            {hasError && <span>{error as string}</span>}
        </>
    );
};

export { Input, PasswordInput };
