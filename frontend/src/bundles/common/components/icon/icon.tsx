import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
    faFacebookF,
    faGoogle,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
    faChevronDown,
    faEye,
    faEyeSlash,
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
    [IconName.LINKEDIN]: faLinkedin,
    [IconName.EYE_OPEN]: faEye,
    [IconName.EYE_SLASH]: faEyeSlash,
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
