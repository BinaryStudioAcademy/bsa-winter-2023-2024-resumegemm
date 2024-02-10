import clsx from 'clsx';
import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import { type ReactNode } from 'react';

import {
    ButtonSize, 
    ButtonTheme,
    IconName, 
    IconSize
} from '~/bundles/common/enums/enums';
import { type ButtonType, type ValueOf } from '~/bundles/common/types/types';

import { Icon } from '../icon/icon';
import styles from './styles.module.scss';

type ButtonProperties = {
    children?: ReactNode;
    type?: ButtonType;
    theme?: ValueOf<typeof ButtonTheme>;
    size?: ValueOf<typeof ButtonSize>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isDisabled?: boolean;
    isSecondary?: boolean;
    className?: string;
    isRightIcon?: boolean;
    isLeftIcon?: boolean;
};

const Button: React.FC<ButtonProperties> = ({
  children,
  onClick,
  type = 'button',
  theme = ButtonTheme.BLUE,
  size = ButtonSize.MEDIUM,
  isDisabled = false,
  className,
  isRightIcon,
  isLeftIcon,
}) => {

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        styles['btn'],
        size && styles[`btn__${size}`],
        theme && styles[`theme-${theme}`],
        isDisabled && styles['disabled'],
        className
      )}
      type={type}
    >
        {isLeftIcon &&  <Icon
            name={IconName.PLUS}
            size={size === ButtonSize.MEDIUM 
                ? IconSize.LARGE as SizeProp 
                : IconSize.MEDIUM as SizeProp
            }
        />}
        {children}
        {isRightIcon &&  <Icon
            name={IconName.CHEVRON_DOWN}
            size={size === ButtonSize.MEDIUM 
                ? IconSize.LARGE as SizeProp 
                : IconSize.MEDIUM as SizeProp
            }
        />}
    </button>
  );
};

export { Button };
