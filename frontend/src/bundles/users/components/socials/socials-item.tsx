import React from 'react';
import { type ValueOf } from 'shared/build';

import { BaseButton, Icon } from '~/bundles/common/components/components';
import { type IconName } from '~/bundles/common/enums/enums';

import styles from './style.module.scss';

type Properties = {
    icon: ValueOf<typeof IconName>;
    network: string;
    buttonText: string;
};

const SocialItem: React.FC<Properties> = ({ icon, network, buttonText }) => {
    return (
        <div className={styles.socials__item}>
            <div className={styles.socials__item__name}>
                <div>
                    <Icon name={icon} />
                </div>
                <p>{network}</p>
            </div>
            <div>
                <BaseButton>{buttonText}</BaseButton>
            </div>
        </div>
    );
};

export { SocialItem };
