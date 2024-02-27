import clsx from 'clsx';

import styles from './styles.module.scss';

type DividerPayload = {
    isBlue?: boolean;
};

const Divider: React.FC<DividerPayload> = ({ isBlue }) => {
    return (
        <div className={clsx(styles.divider, isBlue && styles.divider__blue)} />
    );
};

export { Divider };
