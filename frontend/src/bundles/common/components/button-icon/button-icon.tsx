import { type IconName } from '../../enums/enums';
import { type ValueOf } from '../../types/types';
import { Icon } from '../icon/icon';
import styles from './styles.module.scss';

type IconButtonProperties = {
    iconName?: ValueOf<typeof IconName>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<IconButtonProperties> = ({ iconName, onClick }) => (
    <button className={styles.icon__button} type="button" onClick={onClick}>
        {iconName && <Icon name={iconName} />}
    </button>
);

export { IconButton };
