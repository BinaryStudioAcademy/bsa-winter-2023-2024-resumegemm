import clsx from 'clsx';
import {
    type ButtonHTMLAttributes,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import { IconName } from '../../enums/enums';
import { Icon } from '../components';
import styles from './styles.module.scss';

type SortType = 'asc' | 'desc' | null;

interface Properties extends ButtonHTMLAttributes<HTMLButtonElement> {
    sortType?: SortType;
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SortButton = ({
    sortType,
    children,
    className = '',
    onClick,
}: Properties): JSX.Element => {
    return (
        <button
            className={clsx(
                styles.button__base,
                styles[`sort__${sortType}`],
                className,
            )}
            onClick={onClick}
        >
            {children}
            <div
                className={clsx(styles.icon_wrapper, {
                    [styles[`icon_wrapper__${sortType}`]]: sortType,
                })}
            >
                <Icon name={IconName.ARROW_DOWN} />
                <Icon name={IconName.ARROW_UP} />
            </div>
        </button>
    );
};

export { SortButton };
