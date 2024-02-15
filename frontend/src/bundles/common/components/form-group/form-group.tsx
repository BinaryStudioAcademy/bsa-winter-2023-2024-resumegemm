import { type ReactNode } from 'react';
import { type FieldError } from 'react-hook-form';

import styles from './styles.module.scss';

type Properties = {
    width?: string;
    error?: FieldError;
    label: string;
    children: ReactNode;
};

const FormGroup = ({
    error,
    label,
    children,
    width = 'auto',
}: Properties): JSX.Element => {
    const errorMessage = error?.message;

    return (
        <label className={styles.label} style={{ width }}>
            <span className={styles.label__name}>{label}</span>
            {children}
            {errorMessage && (
                <span className={styles.error}>{errorMessage}</span>
            )}
        </label>
    );
};

export { FormGroup };
