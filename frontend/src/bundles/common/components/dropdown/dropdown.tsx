import clsx from 'clsx';
import { useCallback } from 'react';
import Select from 'react-select';

import styles from './styles.module.scss';

type Option = {
    value: string;
    label: string;
};

type Properties = {
    name: string;
    onChange: (value: string | undefined) => void;
    options: Option[];
    label?: string;
    isDisabled?: boolean;
    placeholder?: string;
    className?: string;
};

const Dropdown: React.FC<Properties> = ({
    name,
    label,
    onChange,
    className,
    placeholder,
    isDisabled,
    options,
}) => {
    const optionChangeHandler = useCallback(
        (option: Option | null) => {
            onChange(option?.value);
        },
        [onChange],
    );

    return (
        <div>
            <span className={styles.dropdown_label}>{label}</span>
            <Select
                className={clsx(styles.dropdown, className)}
                placeholder={placeholder}
                name={name}
                options={options}
                isDisabled={isDisabled}
                onChange={optionChangeHandler}
            />
        </div>
    );
};

export { Dropdown };
