import clsx from 'clsx';
import { type ReactNode } from 'react';

import {
    type IconName,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    IconSize,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { Icon } from '../icon/icon';
import styles from './styles.module.scss';

const sizes: Record<ButtonSize, string> = {
    small: styles.size__small,
    medium: styles.size__medium,
};

const variants: Record<ButtonVariant, string> = {
    default: styles.button__base,
    primary: styles.button__primary,
    outlined: styles.button__outlined,
    ghost: styles.button__ghost,
    square_orange: styles.button__orange,
};

type BaseButtonProperties = {
    children?: ReactNode;
    type?: ValueOf<typeof ButtonType>;
    variant?: ValueOf<typeof ButtonVariant>;
    size?: ValueOf<typeof ButtonSize>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    isFluid?: boolean;
    className?: string;
    appendedIcon?: ValueOf<typeof IconName>;
    prependedIcon?: ValueOf<typeof IconName>;
};

const Button: React.FC<BaseButtonProperties> = ({
    children,
    onClick,
    type = ButtonType.BUTTON,
    variant = ButtonVariant.DEFAULT,
    size = ButtonSize.SMALL,
    isDisabled = false,
    isFluid = false,
    className,
    appendedIcon,
    prependedIcon,
    ...restProperties
}) => {
    const fluid = isFluid ? styles.fluid : '';

    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            className={clsx(
                styles.button__base,
                sizes[size],
                variants[variant],
                fluid,
                className,
            )}
            type={type}
            {...restProperties}
        >
            {prependedIcon && (
                <Icon
                    name={prependedIcon}
                    size={
                        size === ButtonSize.MEDIUM
                            ? IconSize.LARGE
                            : IconSize.MEDIUM
                    }
                />
            )}
            {children}
            {appendedIcon && (
                <Icon
                    name={appendedIcon}
                    size={
                        size === ButtonSize.MEDIUM
                            ? IconSize.LARGE
                            : IconSize.MEDIUM
                    }
                />
            )}
        </button>
    );
};

export { Button };
