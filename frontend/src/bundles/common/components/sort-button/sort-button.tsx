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
    onClick: (sortMethod: SortType) => void;
}

const SortButton = ({
    children,
    initialSortType = null,
    className = '',
    onClick,
}: Properties): JSX.Element => {
    const [sortMethod, setSortMethod] = useState<SortType>(initialSortType);

    const handleSortClick = useCallback(() => {
        if (sortMethod === 'desc') {
            setSortMethod(null);
        } else {
            setSortMethod((sortMethod === 'asc' ? 'desc' : null) ?? 'asc');
        }
    }, [sortMethod, setSortMethod]);

    useEffect(() => {
        onClick(sortMethod);
    }, [sortMethod, onClick]);

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
