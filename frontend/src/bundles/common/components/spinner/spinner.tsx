import clsx from 'clsx';

import { type SpinnerVariant } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type SpinnerPayload = {
    variant: SpinnerVariant;
};

const variants: Record<SpinnerVariant, string> = {
    medium: styles.spinner__medium,
    small: styles.spinner__small,
};

const Spinner: React.FC<SpinnerPayload> = ({ variant }) => {
    return <div className={clsx(styles.spinner, variants[variant])}></div>;
};

export { Spinner };
