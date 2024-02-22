import clsx from 'clsx';
import { type FieldError } from 'react-hook-form';

import {
    FormGroup,
    Icon,
    IconButton,
    Input,
} from '~/bundles/common/components/components';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type PasswordInputProperties = {
    label?: string;
    placeholder?: string;
    error: FieldError | undefined;
    className?: string;
};

const PasswordInput: React.FC<PasswordInputProperties> = ({
    label = 'Password',
    placeholder = 'Password',
    error,
    className,
    ...otherProperties
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback((): void => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    return (
        <>
            <div className={clsx(styles.password, className)}>
                <FormGroup label={label} error={error} width="100%">
                    <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder={placeholder}
                        name="password"
                        {...otherProperties}
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
                </FormGroup>
            </div>
        </>
    );
};

export { PasswordInput };
