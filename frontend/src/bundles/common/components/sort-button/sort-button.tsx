import clsx from 'clsx';
import {
    type ButtonHTMLAttributes,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { type SortDirection } from 'shared/build';

import { IconName } from '../../enums/enums';
import { Icon } from '../components';
import styles from './styles.module.scss';

interface Properties
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    initialSortDirection?: SortDirection;
    children: ReactNode;
    className?: string;
    onSort: (sortMethod: SortDirection) => void;
}

const SortButton = ({
    children,
    initialSortDirection = null,
    className = '',
    onSort,
}: Properties): JSX.Element => {
    const [sortMethod, setSortMethod] =
        useState<SortDirection>(initialSortDirection);

    const handleSortClick = useCallback(() => {
        switch (sortMethod) {
            case 'asc': {
                setSortMethod('desc');
                break;
            }
            case 'desc': {
                setSortMethod(null);
                break;
            }
            default: {
                setSortMethod('asc');
                break;
            }
        }
    }, [sortMethod, setSortMethod]);

    useEffect(() => {
        onSort(sortMethod);
    }, [sortMethod, onSort]);

    return (
        <button
            className={clsx(
                styles.button__base,
                styles[`sort__${sortMethod}`],
                className,
            )}
            onClick={handleSortClick}
        >
            {children}
            <div
                className={clsx(styles.icon_wrapper, {
                    [styles[`icon_wrapper__${sortMethod}`]]: sortMethod,
                })}
            >
                <Icon name={IconName.ARROW_DOWN} />
                <Icon name={IconName.ARROW_UP} />
            </div>
        </button>
    );
};

export { SortButton };
