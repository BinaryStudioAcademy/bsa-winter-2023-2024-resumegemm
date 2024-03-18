import { type FC } from 'react';

import { Icon, Tooltip } from '~/bundles/common/components/components';
import { HintRow } from '~/bundles/common/components/hint/components/hint-row';
import { IconName } from '~/bundles/common/enums/enums';
import { type HintRow as HintRowType } from '~/bundles/common/types/types';

import styles from './styles.module.scss';

type Properties = {
    rows?: HintRowType[];
};

const Hint: FC<Properties> = ({ rows }) => {
    return (
        <Tooltip
            component={
                rows?.length &&
                rows.map((row: HintRowType, index_: number) => (
                    <HintRow key={index_} row={row} />
                ))
            }
        >
            <Icon
                name={IconName.QUESTION_CIRCLE}
                className={styles.hint__anchor_container}
            />
        </Tooltip>
    );
};

export { Hint };
