import clsx from 'clsx';
import {
    type ButtonHTMLAttributes,
    type MouseEventHandler,
    type ReactNode,
} from 'react';

import styles from './styles.module.scss';

type SortType = 'asc' | 'desc' | null;

interface Properties extends ButtonHTMLAttributes<HTMLButtonElement> {
    sortType?: SortType;
    ascendingArrowIcon?: ReactNode | JSX.Element;
    descendingArrowIcon?: ReactNode | JSX.Element;
    iconFontSize?:string;
    defaultIconColor?:string
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Sort = ({
    sortType,
    children,
    className,
    ascendingArrowIcon,
    descendingArrowIcon,
    iconFontSize = '14px',
    defaultIconColor = 'gray',
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
            <div className={clsx(styles.icon_wrapper,{
                [styles[`icon_wrapper__${sortType}`]]: sortType
            })}
            style={{ fontSize:iconFontSize, color:defaultIconColor }}
            >
                {descendingArrowIcon}
                {ascendingArrowIcon}
            </div>
        </button>
    );
};

export { Sort };
