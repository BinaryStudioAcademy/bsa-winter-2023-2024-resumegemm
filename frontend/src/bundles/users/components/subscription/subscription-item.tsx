import { Switch } from '~/bundles/common/components/components';

import styles from './style.module.scss';

type Properties = {
    title: string;
    info: string;
};

const SubscriptionItem: React.FC<Properties> = ({ title, info }) => {
    return (
        <div className={styles.subscription__item}>
            <div className={styles.subscription__item__content}>
                <p>
                    <strong>{title}</strong>
                </p>
                <p>{info}</p>
            </div>
            <div>
                <Switch label="" />
            </div>
        </div>
    );
};

export { SubscriptionItem };
