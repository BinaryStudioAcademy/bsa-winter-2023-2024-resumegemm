import React from 'react';

import { type LayoutBlock } from '../../types/types';
import { RegularItem } from '../template-item/regular-item';

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
                    {item.placeholder && <p>{item.placeholder}</p>}
                    <RegularItem {...item} />
                </React.Fragment>
            ))}
        </div>
    );
};

export { RegularBlock };
