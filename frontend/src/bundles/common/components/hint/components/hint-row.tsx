import { Icon } from '~/bundles/common/components/icon/icon';
import { IconName } from '~/bundles/common/enums/components/icon-name.enum';
import { type HintRow as HintRowType } from '~/bundles/common/types/hint/hint-row.type';

import styles from '../styles.module.scss';

type Properties = {
    row: HintRowType;
};

const HintRow: React.FC<Properties> = ({ row }) => {
    return (
        <div key={row.text} className={styles.hint__row}>
            <Icon
                name={IconName.CHECK_CIRCLE}
                className={styles.hint__row_icon}
            />
            <span className={styles.hint__row_text}>{row.text}</span>
        </div>
    );
};

export { HintRow };
