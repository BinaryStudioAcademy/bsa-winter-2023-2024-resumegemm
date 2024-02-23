import clsx from 'clsx';

import styles from './styles.module.scss';

interface Properties {
    svgIcon: JSX.Element;
    input: JSX.Element;
    className?: string;
}

const IconInput = ({
    svgIcon,
    input,
    className = '',
}: Properties): JSX.Element => {
    return (
        <div className={clsx(styles.input__wrapper, className)}>
            {svgIcon}
            {input}
        </div>
    );
};

export { IconInput };
