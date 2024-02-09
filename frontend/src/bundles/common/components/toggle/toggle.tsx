import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    label: string;
    name: FieldPath<T>;
    type?: 'checkbox' | 'radio' | 'switch';
};

const Toggle = <T extends FieldValues>({
    control,
    label,
    name,
    type = 'checkbox',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    return (
        <label className={styles['container']}>
            <input
                {...field}
                className={styles[type]}
                type={type === 'radio' ? 'radio' : 'checkbox'}
            />
            <span>{label}</span>
        </label>
    );
};

export { Toggle };
