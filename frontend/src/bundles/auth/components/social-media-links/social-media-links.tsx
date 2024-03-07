import clsx from 'clsx';

import { socialMediaLinksWithIcons } from './helpers/social-media-links-with-icons';
import { SocialMediaLink } from './social-media-link/social-media-link';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
};

const SocialMediaLinks: React.FC<Properties> = ({ className = '' }) => {
    return (
        <div className={clsx(styles.social_media, className)}>
            <span className={styles.social_media__description}>
                Or Log In with
            </span>
            <div className={styles.social_media__links}>
                {socialMediaLinksWithIcons.map(([route, icon], index) => (
                    <SocialMediaLink key={index} route={route} icon={icon} />
                ))}
            </div>
        </div>
    );
};

export { SocialMediaLinks };
