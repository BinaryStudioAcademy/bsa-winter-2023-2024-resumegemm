import { type ValueOf, ApiPath } from 'shared/build';

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
import {
    useCallback,
    useRedirect,
    useState,
} from '~/bundles/common/hooks/hooks';

import styles from './style.module.scss';

type Properties = {
    icon: ValueOf<typeof IconName>;
    provider: string;
    isConnected: boolean;
    id: string | null;
    subPath: string;
    onSocialDisconnect: (id: string) => void;
    dataStatus: ValueOf<typeof DataStatus>;
};

const SocialItem: React.FC<Properties> = ({
    icon,
    provider,
    isConnected,
    id,
    onSocialDisconnect,
    subPath,
    dataStatus,
}) => {
    const [currentSocialItemId, setCurrentSocialItemId] = useState<
        string | null
    >(null);

    const { handleRedirect } = useRedirect({
        subPath,
        redirectPath: ApiPath.PROFILE,
    });

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
                    <BaseButton onClick={handleRedirect}>Connect</BaseButton>
                )}
            </div>
        </div>
    );
};

export { SocialItem };
