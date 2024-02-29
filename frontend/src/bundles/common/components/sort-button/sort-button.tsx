import clsx from 'clsx';
import {
    type ButtonHTMLAttributes,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { IconName } from '../../enums/enums';
import { Icon } from '../components';
import styles from './styles.module.scss';

type SortType = 'asc' | 'desc' | null;

interface Properties
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    initialSortType?: SortType;
    children: ReactNode;
    className?: string;
    onSort: (sortMethod: SortType) => void;
}

const SortButton = ({
    children,
    initialSortType = null,
    className = '',
    onSort,
}: Properties): JSX.Element => {
    const [sortMethod, setSortMethod] = useState<SortType>(initialSortType);

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
