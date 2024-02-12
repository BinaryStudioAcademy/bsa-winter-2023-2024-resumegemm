import { type IconName } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { Icon } from '../icon/icon';
import styles from './styles.module.scss';

type IconButtonProperties = {
    iconName: ValueOf<typeof IconName>;
    label?: string | number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProperties> = ({
    iconName,
    label = '',
    onClick,
}) => (
    <button className={styles.iconButton} type="button" onClick={onClick}>
        <Icon name={iconName} />
        {label}
    </button>
);

export { IconButton };
