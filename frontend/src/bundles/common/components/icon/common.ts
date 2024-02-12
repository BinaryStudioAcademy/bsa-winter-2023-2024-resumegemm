import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import { IconName } from '~/bundles/common/enums/enums.js';

const iconNameToSvgIcon = {
    [IconName.PLUS]: faPlus,
    [IconName.CHEVRON_DOWN]: faChevronDown,
    [IconName.FACEBOOK]: faFacebookF,
    [IconName.GOOGLE]: faGoogle,
};

export { iconNameToSvgIcon };
