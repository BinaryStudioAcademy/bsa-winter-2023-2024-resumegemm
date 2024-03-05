import { socialMediaLinksWithIcons } from './helpers/social-media-links-with-icons';
import { SocialMediaLink } from './social-media-link/social-media-link';
import styles from './styles.module.scss';

const SocialMediaLinks: React.FC = () => {
    return (
        <div className={styles.social_media}>
            <span className={styles.social_media__description}>
                Or log in with
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
