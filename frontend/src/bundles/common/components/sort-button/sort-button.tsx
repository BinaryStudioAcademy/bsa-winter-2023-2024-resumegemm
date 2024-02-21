import clsx from 'clsx';
import {
    type ButtonHTMLAttributes,
    type ReactNode,
    useCallback,
    useState,
} from 'react';

import { IconName } from '../../enums/enums';
import { Icon } from '../components';
import styles from './styles.module.scss';

type SortType = 'asc' | 'desc' | null;

interface Properties extends ButtonHTMLAttributes<HTMLButtonElement> {
    initialSortType?: SortType;
    children: ReactNode;
    className?: string;
    onClick: () => void;
}

const SortButton = ({
    children,
    initialSortType = null,
    className = '',
    onClick,
}: Properties): JSX.Element => {
    const [sortMethod, setSortMethod] = useState<SortType>(initialSortType);

    const handleSortClick = useCallback(() => {
        setSortMethod(
            sortMethod ? (sortMethod === 'asc' ? 'desc' : null) : 'asc',
        );
        onClick();
    }, [sortMethod, setSortMethod, onClick]);

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
