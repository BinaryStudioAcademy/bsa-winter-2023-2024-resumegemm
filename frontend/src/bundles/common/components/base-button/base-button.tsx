import clsx from 'clsx';
import { type ReactNode } from 'react';

import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { ButtonWidth } from '../../enums/components/button-width.enum';
import styles from './styles.module.scss';

const sizes: Record<ButtonSize, string> = {
    small: styles.size__small,
    medium: styles.size__medium,
};

const widths: Record<ButtonWidth, string> = {
    full: styles.width__full,
    default: styles.width__default,
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
    width?: ValueOf<typeof ButtonWidth>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    className?: string;
    appendedIcon?: ReactNode;
    prependedIcon?: ReactNode;
};

const BaseButton: React.FC<BaseButtonProperties> = ({
    children,
    onClick,
    type = ButtonType.BUTTON,
    variant = ButtonVariant.DEFAULT,
    size = ButtonSize.SMALL,
    width = ButtonWidth.DEFAULT,
    isDisabled = false,
    className,
    appendedIcon,
    prependedIcon,
    ...restProperties
}) => {
    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            className={clsx(
                styles.button__base,
                sizes[size],
                variants[variant],
                widths[width],
                className,
            )}
            type={type}
            {...restProperties}
        >
            {prependedIcon}
            {children}
            {appendedIcon}
        </button>
    );
};

export { BaseButton };
