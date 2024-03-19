import React from 'react';

import { type LayoutBlock } from '../../types/types';
import { RegularItem } from '../template-item/regular-item';
import regularBlockStyles from './styles.module.scss';

type Properties = LayoutBlock;

const RegularBlock: React.FC<Properties> = ({ id, items, styles }) => {
    return (
        <div
            key={id}
            style={{
                ...styles,
            }}
        >
            {items.map((item, index) => (
                <React.Fragment key={`${index}${item.id}`}>
                    {item.placeholder && (
                        <p className={regularBlockStyles.block__placeholder}>
                            {item.placeholder}
                        </p>
                    )}
                    <RegularItem {...item} />
                </React.Fragment>
            ))}
        </div>
    );
};

export { RegularBlock };
