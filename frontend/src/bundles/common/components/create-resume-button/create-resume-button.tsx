import clsx from 'clsx';
import { type ReactNode } from 'react';

import { ButtonWidth } from '../../enums/components/button-width.enum';
import { ButtonColor } from '../../enums/enums';
import { type ValueOf } from '../../types/types';
import styles from './styles.module.scss';

const colors: Record<ButtonColor, string> = {
    'dark-blue': styles.color__dark_blue,
    'light-gray': styles.color__light_gray,
    'dark-gray': styles.color__dark_gray,
    'gray': styles.color__gray,
    'transparent': styles.color__transparent,
    'white': styles.color__white,
    'red': styles.color__red,
};

const widths: Record<ButtonWidth, string> = {
    full: styles.width__full,
    default: styles.width__default,
};

type CreateResumeButtonProperties = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    className?: string;
    width?: ValueOf<typeof ButtonWidth>;
    color?: ValueOf<typeof ButtonColor>;
};

const CreateResumeFreeButton: React.FC<CreateResumeButtonProperties> = ({
    onClick,
    children,
    className = '',
    color = ButtonColor.DARK_BLUE,
    width = ButtonWidth.DEFAULT,
}) => (
    <button
        className={clsx(
            styles.create_resume__button,
            className,
            widths[width],
            colors[color],
        )}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

export { CreateResumeFreeButton };
