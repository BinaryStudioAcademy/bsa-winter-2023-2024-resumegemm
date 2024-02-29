import { NavLink } from 'react-router-dom';

import { BaseButton } from '~/bundles/common/components/base-button/base-button';
import { ButtonVariant } from '~/bundles/common/enums/components/button-variant.enum';
import { config } from '~/framework/config/config';

import styles from './styles.module.scss';

type SocialMediaLinkPayload = {
    route: string;
    icon: string;
};

const SocialMediaLink: React.FC<SocialMediaLinkPayload> = ({ route, icon }) => (
    <NavLink to={`${config.ENV.API.PROXY_URL}${route}`}>
        <BaseButton variant={ButtonVariant.SQUARE_ORANGE}>
            <div
                className={styles.icon}
                style={{ maskImage: `url(${icon})` }}
            ></div>
        </BaseButton>
    </NavLink>
);

export { SocialMediaLink };
