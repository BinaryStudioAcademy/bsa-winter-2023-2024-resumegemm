import { NavLink } from 'react-router-dom';
import { type ValueOf } from 'shared/build';

import {
    BaseButton,
    Icon,
    Spinner,
} from '~/bundles/common/components/components';
import {
    type IconName,
    DataStatus,
    SpinnerVariant,
} from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { config } from '~/framework/config/config';

import styles from './style.module.scss';

type Properties = {
    icon: ValueOf<typeof IconName>;
    provider: string;
    isConnected: boolean;
    id: string | null;
    redirectPath: string;
    onSocialDisconnect: (id: string) => void;
    dataStatus: ValueOf<typeof DataStatus>;
};

const SocialItem: React.FC<Properties> = ({
    icon,
    provider,
    isConnected,
    id,
    onSocialDisconnect,
    redirectPath,
    dataStatus,
}) => {
    const [currentSocialItemId, setCurrentSocialItemId] = useState<
        string | null
    >(null);

    const handleSocialMediaDisconnect = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const currentId = event.currentTarget.dataset.button as string;
            setCurrentSocialItemId(currentId);
            onSocialDisconnect(id as string);
        },
        [onSocialDisconnect, id],
    );

    const isLoading = dataStatus === DataStatus.PENDING;

    return (
        <div className={styles.socials__item}>
            <div className={styles.socials__item__name}>
                <div>
                    <Icon name={icon} />
                </div>
                <p>{provider}</p>
            </div>
            <div>
                {isConnected ? (
                    <BaseButton
                        data-button={id}
                        disabled={isLoading}
                        className={styles.flex__button}
                        onClick={handleSocialMediaDisconnect}
                    >
                        {currentSocialItemId && isLoading && (
                            <Spinner variant={SpinnerVariant.SMALL} />
                        )}
                        Disconnect
                    </BaseButton>
                ) : (
                    <NavLink to={`${config.ENV.APP.DOMAIN_URL}${redirectPath}`}>
                        Connect
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export { SocialItem };
