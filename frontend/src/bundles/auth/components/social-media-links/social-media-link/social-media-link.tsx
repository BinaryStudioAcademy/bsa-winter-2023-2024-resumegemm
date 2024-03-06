import { RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/components/button-variant.enum';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { config } from '~/framework/config/config';

import styles from './styles.module.scss';

type SocialMediaLinkPayload = {
    route: string;
    icon: string;
};

const SocialMediaLink: React.FC<SocialMediaLinkPayload> = ({ route, icon }) => {
    const handleRedirect = useCallback(() => {
        window.open(`${config.ENV.APP.DOMAIN_URL}${route}`, '_self');
    }, [route]);

    return (
        <RegularButton
            onClick={handleRedirect}
            variant={ButtonVariant.SQUARE_ORANGE}
        >
            <div
                className={styles.icon}
                style={{ maskImage: `url(${icon})` }}
            ></div>
        </RegularButton>
    );
};

export { SocialMediaLink };
