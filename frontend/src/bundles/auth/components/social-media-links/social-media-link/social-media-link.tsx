import { NavLink } from 'react-router-dom';

import { RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/components/button-variant.enum';
import { config } from '~/framework/config/config';

type SocialMediaLinkPayload = {
    route: string;
    icon: string;
};

const SocialMediaLink: React.FC<SocialMediaLinkPayload> = ({ route, icon }) => (
    <NavLink to={`${config.ENV.API.PROXY_URL}${route}`}>
        <RegularButton variant={ButtonVariant.SQUARE_ORANGE}>
            <img src={icon} alt={icon} />
        </RegularButton>
    </NavLink>
);

export { SocialMediaLink };
