import clsx from 'clsx';

import styles from './styles.module.scss';

interface Properties {
    prependedIcon: JSX.Element;
    input: JSX.Element;
    className?: string;
}

const IconInput = ({
    prependedIcon,
    input,
    className = '',
}: Properties): JSX.Element => {
    return (
        <div className={clsx(styles.input__wrapper, className)}>
            {prependedIcon}
            {input}
        </div>
    );
};

export { IconInput };
