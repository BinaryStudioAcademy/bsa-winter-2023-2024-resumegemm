import { type SocialMediaProfiles, type ValueOf } from 'shared/build';

import { type DataStatus, type IconName } from '~/bundles/common/enums/enums';

import { SocialItem } from './socials-item';
import styles from './style.module.scss';

type SocialsPayload = {
    socialMediaConnections: SocialMediaProfiles[];
    onSocialDisconnect: (id: string) => void;
    dataStatus: ValueOf<typeof DataStatus>;
};

const Socials: React.FC<SocialsPayload> = ({
    socialMediaConnections,
    onSocialDisconnect,
    dataStatus,
}) => {
    return (
        <div className={styles.socials}>
            {socialMediaConnections.map(
                ({ provider, id, connected, redirect }, index) => {
                    return (
                        <SocialItem
                            key={index}
                            icon={
                                provider as unknown as ValueOf<typeof IconName>
                            }
                            id={id}
                            redirectPath={redirect}
                            dataStatus={dataStatus}
                            provider={provider}
                            isConnected={connected}
                            onSocialDisconnect={onSocialDisconnect}
                        />
                    );
                },
            )}
        </div>
    );
};

export { Socials };
