import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
    faFacebookF,
    faGithub,
    faGoogle,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
    faArrowDownLong,
    faArrowUpLong,
    faCheck,
    faChevronDown,
    faClose,
    faCreditCard,
    faEye,
    faEyeSlash,
    faMagnifyingGlass,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName, IconSize } from '../../enums/components/components';
import { type ValueOf } from '../../types/types';

const iconNameToSvgIcon = {
    [IconName.PLUS]: faPlus,
    [IconName.CHEVRON_DOWN]: faChevronDown,
    [IconName.FACEBOOK]: faFacebookF,
    [IconName.GOOGLE]: faGoogle,
    [IconName.GITHUB]: faGithub,
    [IconName.LINKEDIN]: faLinkedin,
    [IconName.EYE_OPEN]: faEye,
    [IconName.EYE_SLASH]: faEyeSlash,
    [IconName.SEARCH]: faMagnifyingGlass,
    [IconName.ARROW_DOWN]: faArrowDownLong,
    [IconName.ARROW_UP]: faArrowUpLong,
    [IconName.CLOSE_CROSS]: faClose,
    [IconName.CREDIT_CARD]: faCreditCard,
    [IconName.CHECK]: faCheck,
};

type IconProperties = {
    className?: string;
    name: ValueOf<typeof IconName>;
    size?: SizeProp;
    color?: string;
};

const Icon: React.FC<IconProperties> = ({
    className,
    name,
    size = IconSize.LARGE,
    color,
}) => (
    <FontAwesomeIcon
        className={className as string}
        icon={iconNameToSvgIcon[name]}
        size={size}
        color={color as string}
    />
);

export { Icon };
