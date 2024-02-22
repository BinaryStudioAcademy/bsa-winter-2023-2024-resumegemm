import clsx from 'clsx';
import { type InputHTMLAttributes } from 'react';

import { IconName, IconSize } from '../../enums/enums';
import { Icon } from '../components';
import styles from './styles.module.scss';

interface Properties extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    iconName?: IconName;
}

const IconInput = ({
    className = '',
    iconName = IconName.SEARCH,
    ...otherProperties
}: Properties): JSX.Element => {
    const { onChange } = otherProperties;

    return (
        <label className={styles.input__wrapper}>
            <Icon size={IconSize.LARGE} name={iconName} />
            <input
                className={clsx(styles.icon_input, className)}
                {...otherProperties}
                onChange={onChange}
            />
        </label>
    );
};

export { IconInput };
