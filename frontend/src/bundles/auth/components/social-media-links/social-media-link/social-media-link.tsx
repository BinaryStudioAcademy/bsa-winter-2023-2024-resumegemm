import { OpenAuthApiPath } from 'shared/build';

import { RegularButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/components/button-variant.enum';
import { useRedirect } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type SocialMediaLinkPayload = {
    route: string;
    icon: string;
};

const SocialMediaLink: React.FC<SocialMediaLinkPayload> = ({ route, icon }) => {
    const { handleRedirect } = useRedirect({
        redirectPath: OpenAuthApiPath.ROOT,
        subPath: route,
    });

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
