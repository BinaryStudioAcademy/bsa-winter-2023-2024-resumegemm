import { IconName } from '~/bundles/common/enums/enums';

import { SocialItem } from './socials-item';
import styles from './style.module.scss';

const Socials: React.FC = () => {
    return (
        <div className={styles.socials}>
            <SocialItem
                icon={IconName.FACEBOOK}
                network="Facebook"
                buttonText="Connect"
            />
            <SocialItem
                icon={IconName.LINKEDIN}
                network="LinkedIn"
                buttonText="Connect"
            />
            <SocialItem
                icon={IconName.GOOGLE}
                network="Google"
                buttonText="Connect"
            />
        </div>
    );
};

export { Socials };
