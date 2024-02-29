import { NavLink } from 'react-router-dom';

import { RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/components/button-variant.enum';
import { config } from '~/framework/config/config';

import styles from './styles.module.scss';

type SocialMediaLinkPayload = {
    route: string;
    icon: string;
};

const SocialMediaLink: React.FC<SocialMediaLinkPayload> = ({ route, icon }) => (
    <NavLink to={`${config.ENV.API.PROXY_URL}${route}`}>
        <RegularButton variant={ButtonVariant.SQUARE_ORANGE}>
            <div
                className={styles.icon}
                style={{ maskImage: `url(${icon})` }}
            ></div>
        </RegularButton>
    </NavLink>
);

export { SocialMediaLink };
