import clsx from 'clsx';
import { type InputHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.scss';

interface Properties extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    width?: string;
}
const Input = forwardRef<HTMLInputElement, Properties>(
    ({ hasError = false, width = 'auto', disabled, ...otherProperties }, reference) => (
        <input
            className={clsx(styles.input, {
                [styles.input__error]: hasError,
                [styles.input__disabled]: disabled,
            })}
            {...otherProperties}
            style={{ width }}
            ref={reference}
            type="text"
            
        />
    ),
);

Input.displayName = 'Input';
export { Input };
