import { useCallback, useState } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '../../hooks/hooks';
import { Option } from './option/option';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    label: string;
    control: Control<T, null>;
    name: FieldPath<T>;
    defaultOption: string;
    options: {
        value: string;
        label: string;
    }[];
};

const Dropdown = <T extends FieldValues>({
    control,
    name,
    label,
    defaultOption,
    options,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({
        name,
        control,
    });

    const { onChange } = field;

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(defaultOption);

    const dropdownClickHandler = useCallback(() => {
        setActive((previousActive) => !previousActive);
    }, []);

    const optionChangeHandler = useCallback(
        ({ value, label }: { value: string; label: string }) => {
            setSelected(label);
            onChange(value);
            setActive(false);
        },
        [onChange],
    );

    return (
        <div className={styles.dropdown_container}>
            <span className={styles.label}>{label}</span>
            <div
                className={`${styles.dropdown}  ${active ? styles.active : ''}`}
            >
                <button
                    type="button"
                    className={styles.dropdown_button}
                    onClick={dropdownClickHandler}
                >
                    {selected}
                </button>
                {active && (
                    <ul className={styles.dropdown_list}>
                        {options.map(({ value, label }, index) => (
                            <Option
                                key={index}
                                onClick={optionChangeHandler}
                                value={value}
                                label={label}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export { Dropdown };
