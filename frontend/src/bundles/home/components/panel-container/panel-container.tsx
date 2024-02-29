import clsx from 'clsx';
import { useCallback } from 'react';
import { type SortType } from 'shared/build';

import { Icon, Input } from '~/bundles/common/components/components';
import { IconInput } from '~/bundles/common/components/icon-input/icon-input';
import { SortButton } from '~/bundles/common/components/sort-button/sort-button';
import { IconName, IconSize } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
    name: string;
    classname?: string;
};

const PanelContainer: React.FC<Properties> = ({
    children,
    name,
    classname,
}: Properties) => {
    const sortHandle = useCallback((sortMethod: SortType): void => {
        // TODO: handle sort action
        sortMethod;
    }, []);

    return (
        <div className={clsx(styles.panel_container, classname)}>
            <div className={styles.panel_container__top_bar}>
                {name}
                <div className={styles.panel_container__options_wrapper}>
                    <IconInput
                        prependedIcon={
                            <Icon
                                size={IconSize.MEDIUM}
                                name={IconName.SEARCH}
                            />
                        }
                        input={
                            <Input className={styles.panel_container__input} />
                        }
                    />
                    <SortButton onSort={sortHandle}>Sort</SortButton>
                </div>
            </div>
            <div className={styles.panel_container__content}>{children}</div>
        </div>
    );
};

export { PanelContainer };
