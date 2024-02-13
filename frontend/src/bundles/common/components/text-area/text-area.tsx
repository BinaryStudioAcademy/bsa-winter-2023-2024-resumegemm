import clsx from 'clsx';
import  { type TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import styles from './styles.module.scss';

interface Properties extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
    width?:string;
}

const TextArea = forwardRef<HTMLTextAreaElement,Properties>(
    ({ hasError = false, width = 'auto', disabled, ...otherProperties }, reference) =>(
    <textarea 
        className={clsx(styles.textArea,{
            [styles.error]: hasError,
            [styles.disabled]: disabled
        })}
        style={{ width }}
        ref={reference}
        {...otherProperties}
    ></textarea>
));

TextArea.displayName = 'TextArea';

export { TextArea };