import clsx from 'clsx';
import { type SortDirection } from 'shared/build/index.js';

import { Icon, Input } from '~/bundles/common/components/components';
import { IconInput } from '~/bundles/common/components/icon-input/icon-input';
import { SortButton } from '~/bundles/common/components/sort-button/sort-button';
import { IconName, IconSize } from '~/bundles/common/enums/enums';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks';

import { Filter } from '../components';
import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    onHandleSearch: React.ChangeEventHandler<HTMLInputElement>;
    hasIconInput?: boolean;
    className?: string;
    onSort: (sortMethod: SortDirection) => void;
};

const PanelContainer: React.FC<Properties> = ({
    children,
    name,
    onHandleSearch,
    hasIconInput = true,
    className,
    onSort,
}: Properties) => {
    const dispatch = useAppDispatch();

    const sortHandle = useCallback(
        (sortMethod: SortDirection): void => {
            onSort(sortMethod);
        },
        [dispatch, onSort],
    );

    return (
        <div className={clsx(styles.panel_container, className)}>
            <div className={styles.panel_container__top_bar}>
                {name}
                <div className={styles.panel_container__options_wrapper}>
                    {hasIconInput && (
                        <IconInput
                            prependedIcon={
                                <Icon
                                    size={IconSize.MEDIUM}
                                    name={IconName.SEARCH}
                                />
                            }
                            input={
                                <Input
                                    placeholder=" Search"
                                    className={styles.panel_container__input}
                                    onChange={onHandleSearch}
                                />
                            }
                        />
                    )}
                    <SortButton onSort={sortHandle}>Sort</SortButton>
                    <Filter />
                </div>
            </div>
            <div className={styles.panel_container__content}>{children}</div>
        </div>
    );
};

export { PanelContainer };
