import clsx from 'clsx';

import { type DividerVariant } from '~/bundles/common/enums/enums.js';

import styles from './styles.module.scss';

const variants: Record<DividerVariant, string> = {
    primary: styles.divider__blue,
    secondary: styles.divider__yellow,
};

type DividerPayload = {
    variant: DividerVariant;
};

const Divider: React.FC<DividerPayload> = ({ variant }) => {
    return <div className={clsx(styles.divider, variants[variant])} />;
};

export { Divider };
