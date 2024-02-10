import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type SizeProp } from '@fortawesome/fontawesome-svg-core';

import { type IconName, IconSize } from '../../enums/components/components';
import { type ValueOf } from '../../types/types';
import { iconNameToSvgIcon } from './common';

type IconProperties = {
    className?: string;
    name: ValueOf<typeof IconName>;
    size?:  SizeProp;
    color?: string;
};

const Icon: React.FC<IconProperties> = ({
    className,
    name,
    size = IconSize.LARGE as SizeProp,
    color,
  }) => (
    <FontAwesomeIcon
      className={className as string}
      icon={iconNameToSvgIcon[name]}
      size={size as SizeProp}
      color={color as string}
    />
  );
  
  export { Icon };
  